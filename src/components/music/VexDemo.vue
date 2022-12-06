<template>
  <div class="w-full">
    <div class="flex justify-between">
      <div class="text-lg font-bold">
        五線譜
        <span class="badge">beta</span>
      </div>

      <div class="flex space-x-2">
        <div class="flex items-end">
          <div class="form-control">
            <label class="label">
              <span class="label-text">BPM</span>
            </label>
            <input type="text" class="input input-sm" placeholder="" v-model="bpm" />
          </div>
          <div class="btn btn-sm" @click="play()">播放</div>
          <div class="btn btn-sm" @click="stop()">停止</div>
        </div>

        <div class="flex items-end">
          <div class="form-control">
            <label class="label">
              <span class="label-text">每行小節數</span>
            </label>
            <input type="number" min="1" class="input input-sm" placeholder="每行小節數" v-model="stavePerLine" />
          </div>
          <div class="btn btn-sm" @click="drawStaves(musicData)">更新</div>
        </div>

        <div class="flex items-end">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">列印標題設定</span>
            </label>
            <input type="text" class="input input-sm" placeholder="標題名稱" v-model="printName" />
          </div>
          <div class="btn btn-sm" @click="printDownload">列印</div>
        </div>
      </div>

    </div>
    <div class="divider"></div>
  </div>
  <div ref="vexSection" class="flex flex-col items-center justify-center">
    <div id="header" class="text-lg w-full text-center pb-4 font-bold hidden">{{ printName }}</div>
    <div ref="vexElem" class="w-full flex flex-col items-center justify-center">
      <div id="output" ref="canvasElem" class="w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { stableSort } from 'highcharts';
import { Vex } from 'vexflow'
import { computed, onMounted, ref, watch } from 'vue'
import Music from '../../objects/music'
import Utils from '../../objects/utils'
import { NOTE_FREQ_MAP } from '../../objects/constant'

const { Stave, StaveNote, Beam, Formatter, Renderer } = Vex.Flow
const prop = defineProps([
  'brainData'
])
const utils = new Utils()
const vexSection = ref({})
const vexElem = ref({})
const canvasElem = ref({})
const musicData = computed(() => new Music(prop.brainData))
const stavePerLine = ref(4)
const printName = ref(prop.brainData.name + ' - 專屬音樂')
const noteList = ref('')
const staveNoteList = ref('')

onMounted(() => {
  console.log("========= parse global Stave Note List ========")
  noteList.value = musicData.value.getFirstNoteList().before.flat()
  console.log(noteList.value)
  console.log(noteList.value.length)

  // staveNoteList.value = parseNotes(noteList.value)
  // console.log("========= parse second Stave Note List ========")
  // const secondNoteList = musicData.value.getSecondNoteList().before
  // console.log(secondNoteList.length)
  // secondStaveNoteList.value = parseNotes(secondNoteList, 4, -1)
  // console.log("========= parse third Stave Note List ========")
  // const thirdNoteList = musicData.value.getThirdNoteList().before
  // console.log(thirdNoteList.length)
  // thirdStaveNoteList.value = parseNotes(thirdNoteList, 5, 1)
})
const now = computed(() => {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  return today.toDateString()
})

const audioCtx = new AudioContext()
let oscillator = undefined
const bpm = ref(60)

function play() {
  console.log(NOTE_FREQ_MAP)
  console.log('play')
  console.log(bpm.value)
  if (!bpm.value) {
    return
  }
  if (oscillator) {
    stop()
  }
  oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  let timeValue = audioCtx.currentTime
  noteList.value.forEach((note, idx) => {
    console.log(note)
    if (note.noteName) {

      const noteValue = `${note.noteName}3`.toUpperCase()
      const freqValue = NOTE_FREQ_MAP[noteValue]
      console.log(noteValue)
      console.log(freqValue)
      console.log(timeValue)
      oscillator.frequency.setValueAtTime(freqValue, timeValue++)
      // oscillator.frequency.setValueAtTime(0, timeValue++)
    }
  })
  oscillator.frequency.setValueAtTime(0, timeValue++)
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function stop() {
  console.log('stop')
  if (oscillator) {
    oscillator.stop()
    oscillator = undefined
  }
}

function createMenuItem(name) {
  let div = document.createElement('div')
  div.id = name
  div.classList.add('w-full')
  // div.textContent = name
  return div
}

watch(prop, (newValue, oldValue) => {
  drawStaves(musicData.value)
})

function printDownload() {
  let w = window.open()

  w.document.write(vexSection.value.innerHTML)
  w.document.close()
  w.setTimeout(function () {
    w.print()
  }, 1000)
}

const parseNotes = (staves, position = 4, stemDirection = null) => {
  console.log(staves)
  // const duration_per_stave = musicData.value.timeSignature.split('/')[0] / musicData.value.timeSignature.split('/')[1]
  const staveNoteList = []
  let tmpStaveDuration = 0
  let tmpNotes = []
  staves.forEach((stave, sIdx) => {
    // console.log(stave)
    stave.forEach((note, nIdx) => {
      // console.log(note)
      if (note.noteName) {
        tmpNotes.push(new StaveNote({ keys: [`${note.noteName}/${position}`], duration: note.duration, stem_direction: stemDirection }))
      }
    })
    // console.log(tmpNotes)
    if (tmpNotes.length > 0) {
      staveNoteList.push(tmpNotes)
      tmpNotes = []
    }
  })
  return staveNoteList
}

const drawStaves = (data) => {
  vexElem.value.innerHTML = ''
  // This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).

  let divCount = 0
  vexElem.value.appendChild(createMenuItem('output' + divCount++))
  let div = vexElem.value.lastChild
  let renderer = new Renderer(div, Renderer.Backends.SVG)
  let currentStaveCount = 0
  let tmpTrebleStave = null
  let tmpAltoStave = null
  let tmpBassStave = null
  let context = renderer.getContext()
  let staveX = 10
  let rendererHeight = 280
  let rendererWidth = vexElem.value.clientWidth
  const clefWidth = 50
  const staveWidth = (rendererWidth - clefWidth) / stavePerLine.value - 10
  let timeSignature = data.timeSignature

  console.log("========= parse first Stave Note List ========")
  const firstNoteList = musicData.value.getFirstNoteList().before
  console.log(firstNoteList.length)
  const firstStaveNoteList = parseNotes(firstNoteList)
  console.log("========= parse second Stave Note List ========")
  const secondNoteList = musicData.value.getSecondNoteList().before
  console.log(secondNoteList.length)
  const secondStaveNoteList = parseNotes(secondNoteList, 4, -1)
  console.log("========= parse third Stave Note List ========")
  const thirdNoteList = musicData.value.getThirdNoteList().before
  console.log(thirdNoteList.length)
  const thirdStaveNoteList = parseNotes(thirdNoteList, 5, 1)
  const max_staves = utils.max([firstStaveNoteList.length, secondStaveNoteList.length, thirdStaveNoteList.length])

  // renderer.resize(vexElem.value.clientWidth, rendererHeight)
  renderer.resize(rendererWidth, rendererHeight)

  for (let idx = 0; idx < max_staves; idx++) {
    let tmpTrebleNotes = thirdStaveNoteList[idx]
    let tmpAltoNotes = secondStaveNoteList[idx]
    let tmpBassNotes = firstStaveNoteList[idx]
    if (!tmpTrebleNotes && !tmpAltoNotes) {
      break
    }
    // if (!tmpTrebleNotes) {
    //   tmpTrebleNotes = [new StaveNote({ keys: [`c/5`], duration: '1r' })]
    // }

    // if (!tmpAltoNotes) {
    //   tmpAltoNotes = [new StaveNote({ keys: [`c/5`], duration: '1r' })]
    // }
    if (!tmpBassNotes) {
      tmpBassNotes = [new StaveNote({ keys: [`c/5`], duration: '1r' })]
    }

    if (currentStaveCount && currentStaveCount % stavePerLine.value === 0) {
      currentStaveCount = 0
      staveX = 10
      tmpTrebleStave = null
      tmpAltoStave = null
      tmpBassStave = null
      divCount++
      vexElem.value.appendChild(createMenuItem('trebleLine' + divCount))
      // vexElem.value.appendChild(createMenuItem('altoLine' + divCount))
      vexElem.value.appendChild(createMenuItem('bassLine' + divCount))
      // Create an SVG renderer and attach it to the DIV element with id="output".
      div = vexElem.value.lastChild
      renderer = new Renderer(div, Renderer.Backends.SVG)
      renderer.resize(rendererWidth, rendererHeight)
      context = renderer.getContext()
    }
    if (currentStaveCount === 0) {
      tmpTrebleStave = new Stave(staveX, 20, staveWidth + clefWidth)
      tmpBassStave = new Stave(staveX, 130, staveWidth + clefWidth)
    }
    else {
      tmpTrebleStave = new Stave(staveX, 20, staveWidth)
      tmpBassStave = new Stave(staveX, 130, staveWidth)
    }
    // tmpAltoStave = new Stave(staveX, 120, staveWidth)
    // tmpBassStave = new Stave(staveX, 220, staveWidth)
    if (tmpTrebleStave) {
      staveX = tmpTrebleStave.width + tmpTrebleStave.x
    }

    if (currentStaveCount === 0) {
      tmpTrebleStave.addClef('treble').addTimeSignature(timeSignature);
      // tmpAltoStave.addClef('treble').addTimeSignature(timeSignature);
      tmpBassStave.addClef('bass').addTimeSignature(timeSignature);
    }
    tmpTrebleStave.setContext(context).draw()
    // tmpAltoStave.setContext(context).draw()
    tmpBassStave.setContext(context).draw()

    currentStaveCount++
    if (tmpTrebleNotes) {
      const trebleBeams = Beam.generateBeams(tmpTrebleNotes, { stem_direction: 1 });
      Formatter.FormatAndDraw(context, tmpTrebleStave, tmpTrebleNotes)
      trebleBeams.forEach((b) => {
        b.setContext(context).draw();
      });
    }

    if (tmpAltoNotes) {
      const altoBeams = Beam.generateBeams(tmpAltoNotes, { stem_direction: -1 });
      Formatter.FormatAndDraw(context, tmpTrebleStave, tmpAltoNotes)
      altoBeams.forEach((b) => {
        b.setContext(context).draw();
      });
    }
    if (tmpBassNotes) {
      const bassBeams = Beam.generateBeams(tmpBassNotes);
      Formatter.FormatAndDraw(context, tmpBassStave, tmpBassNotes)
      bassBeams.forEach((b) => {
        b.setContext(context).draw();
      });
    }
  }
}

onMounted(() => {
  drawStaves(musicData.value)
})
</script>

<style scoped>
</style>