<template>
  <div class="flex gap-2">
    <div class="btn btn-sm btn-outline btn-error" @click="initCanvas">重新產生</div>
    <div class="btn btn-sm btn-outline btn-primary" @click="downloadCanvas">下載圖片</div>
  </div>
  <div class="mockup-window border border-base-300 shadow-lg bg-base-300 w-full my-2">
    <div id="p5Canvas" ref="p5elem" class="rounded w-full"></div>
  </div>
  <div class="flex gap-2">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">弧線出現的臨界值</span>
      </label>
      <input type="number" name="arcThreshold" v-model="arcThreshold" class="input input-bordered w-full max-w-xs">
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">中心圓圈出現的臨界值</span>
      </label>
      <input type="number" name="arcThreshold" v-model="circleThreshold" class="input input-bordered w-full max-w-xs">
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">中心圓圈的透明度</span>
      </label>
      <input type="number" name="arcThreshold" min="0" max="100" v-model="circleOpacity"
        class="input input-bordered w-full max-w-xs">
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import P5 from 'p5'

const prop = defineProps([
  'brainData'
])
const canvas = ref('')
const p5elem = ref({})
const arcThreshold = ref(10)
const circleThreshold = ref(10)
const circleOpacity = ref(5)
console.log(arcThreshold.value)
const sketch = function (s) {
  const attentionArray = prop.brainData ? prop.brainData.attention.before : []
  const meditationArray = prop.brainData ? prop.brainData.meditation.before : []
  const deltaArray = prop.brainData ? prop.brainData.delta.before : []
  const thetaArray = prop.brainData ? prop.brainData.theta.before : []
  const lowAlphaArray = prop.brainData ? prop.brainData.lowAlpha.before : []
  const highAlphaArray = prop.brainData ? prop.brainData.highAlpha.before : []
  const lowBetaArray = prop.brainData ? prop.brainData.lowBeta.before : []
  const highBetaArray = prop.brainData ? prop.brainData.highBeta.before : []
  const lowGammaArray = prop.brainData ? prop.brainData.lowGamma.before : []
  const highGammaArray = prop.brainData ? prop.brainData.highGamma.before : []
  let ncl = 0
  const ROW_COUNT = attentionArray.length
  const COL_COUNT = 11
  const elemWidth = p5elem.value.clientWidth
  const elemHeight = s.windowHeight
  console.log(elemWidth, elemHeight)
  s.setup = () => {
    s.frameRate(5)
    s.createCanvas(elemWidth, elemHeight / 1.5)
    let x = 0
    let y = (elemHeight * 0.9 - (elemHeight / 1.5)) / 2
    s.background(255)
    s.textSize(10)
    s.fill('black')
  }
  s.draw = () => {
    s.rectMode(s.CENTER)
    for (let r = 0; r < ROW_COUNT; r++) {
      const Signal = 100
      const Attention = attentionArray[r]
      const Meditation = meditationArray[r]
      const Delta = deltaArray[r]
      const Theta = thetaArray[r]
      const LAlpha = lowAlphaArray[r]
      const HAlpha = highAlphaArray[r]
      const LBeta = lowBetaArray[r]
      const HBeta = highBetaArray[r]
      const Lgama = lowGammaArray[r]
      const Hgama = highGammaArray[r]

      for (let d = 1; d < COL_COUNT - 1; d++) {
        //draw something
        let avgWidth = s.width / (COL_COUNT - 1)
        let avgHeight = s.height / (ROW_COUNT - 1)
        let avgAlpha = (LAlpha + HAlpha) / 2
        let avgBeta = (LBeta + HBeta) / 2
        let avgGama = (Lgama + Hgama) / 2
        let sign = s.map(Signal, 0, 100, 10, 255)
        let atten = s.map(Attention, 0, 100, 0, 255)
        let medi = s.map(Meditation, 0, 100, 0, 255)

        if (d * avgWidth !== s.width / 2) {                    //中間不要畫
          s.fill(s.random(0, atten), s.random(0, medi), s.abs(atten - medi), 50) //專注指數越高越接近紅色,冥想指數越高越接近綠色,專注指數跟冥想指數-落差越大越接近藍色
          s.noStroke()
          s.strokeWeight(2)
          // stroke(255,255,255,50)
          s.ellipse(d * avgWidth + s.random(avgWidth / 5) - s.random(avgWidth / 5), r * avgHeight + avgHeight, avgHeight)
        }
        if (avgAlpha > arcThreshold.value) {
          s.noFill()
          s.strokeWeight(avgAlpha)
          s.stroke(s.random(100, atten), s.random(100, medi), s.abs(sign), 5)
          s.arc(d * avgWidth, r * avgHeight, 200, 200, 0, s.PI + s.QUARTER_PI)
        }

        if (s.frameCount % 2 === 0) {
          s.noStroke()
          s.fill(s.random(50, 100), s.random(0, 50), s.random(255), 50)
          s.rect(d * avgWidth - avgWidth / 2, s.random(s.height), avgBeta * 5 + s.abs(LBeta - HBeta) * 1.5) //平均Beta值越高小方塊越大,若最高與最低Beta差值過大會等倍數增加大小+abs(LBeta-HBeta)*50
        }
        // }
        if (avgGama > circleThreshold.value) {
          s.fill(s.random(0, 150), s.random(0, 255), s.random(0, 150), circleOpacity.value)
          s.stroke(235, 255, 235, 55)
          s.strokeWeight(avgGama / 1.5)
          s.circle(s.width / 2, s.height / 2, d * r * avgGama / circleThreshold.value)


        }

      }
    }


    if (s.frameCount > 10) {
      s.textSize(50)
      s.fill(255, 105, 0, 150)
      s.noLoop()
    }

  }
}

function initCanvas() {
  let select = document.getElementById('p5Canvas')
  if (select.lastChild) select.removeChild(select.lastChild)
  canvas.value = new P5(sketch, 'p5Canvas')
}

function downloadCanvas() {
  let current = new Date()
  canvas.value.saveCanvas(`${prop.brainData.name}-${current.getFullYear()}${current.getMonth()}${current.getDate()}_${current.getHours()}_${current.getMinutes()}_${current.getSeconds()}`, 'png')
}

onMounted(() => {
  initCanvas()
})

watch(prop, () => {
  initCanvas()
})
</script>

<style scoped>
</style>