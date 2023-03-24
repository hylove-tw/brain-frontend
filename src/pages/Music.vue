<template>
    <div class="w-full">
        <div class="flex flex-col gap-6">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex w-full justify-start items-center">
                        <header class="flex flex-col justify-start">
                            <h2 class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
                            <h3 class="text-md">{{ subTitle }}</h3>
                        </header>
                    </div>
                    <div class="text-sm font-semibold">{{ message }}</div>
                    <div v-show="currentData">
                        <div class="space-y-4">
                            <div class="flex flex-col space-y-2 space-x-2 justify-between">
                                <div class="flex space-x-2 justify-between items-end">
                                    <span class="form-control">
                                        <label class="label" for="hiInst">
                                            <span class="label-text">樂譜標題</span>
                                        </label>
                                        <input class="input input-bordered input-xs" id="sheetTitle" placeholder="輸入標題"
                                            v-model="documentTitle">
                                    </span>
                                    <span class="form-control">
                                        <label class="label" for="hiInst">
                                            <span class="label-text">樂譜速度(BPM)</span>
                                        </label>
                                        <input type="number" min="1" class="input input-bordered input-xs" id="soundTempo"
                                            placeholder="輸入速度" v-model="bpm">
                                    </span>
                                    <span class="form-control inline">
                                        <label class="label" for="hiInst">
                                            <span class="label-text">高音部樂器</span>
                                        </label>
                                        <select name="high" id="hiInst" class="input input-xs input-bordered"
                                            v-model="highInstrument">
                                            <option v-for="instrument in instrumentChoices">
                                                {{ instrument }}
                                            </option>
                                        </select>
                                    </span>
                                    <span class="form-control inline">
                                        <label class="label" for="midInst">
                                            <span class="label-text">中音部樂器</span>
                                        </label>
                                        <select name="high" id="midInst" class="input input-xs input-bordered"
                                            v-model="midInstrument">
                                            <option v-for="instrument in instrumentChoices">
                                                {{ instrument }}
                                            </option>
                                        </select>
                                    </span>
                                    <span class="form-control inline">
                                        <label class="label" for="lowInst">
                                            <span class="label-text">低音樂部器</span>
                                        </label>
                                        <select name="high" id="lowInst" class="input input-xs input-bordered"
                                            v-model="lowInstrument">
                                            <option v-for="instrument in instrumentChoices">
                                                {{ instrument }}
                                            </option>
                                        </select>
                                    </span>
                                    <button type="button" @click="fetchMusicXML"
                                        class="btn btn-primary btn-xs">產生樂譜</button>
                                </div>
                                <div class="flex space-x-2 justify-end">
                                    <a id="exportMidi" class="btn btn-outline btn-xs">Export MIDI</a>
                                    <a id="exportWav" class="btn btn-outline btn-xs">Export WAV</a>
                                    <a id="exportMp3" class="btn btn-outline btn-xs">Export MP3</a>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div id="embed-example" class="w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Embed from 'flat-embed';
import axios from 'axios';
import MidiConverter from '../utils/midiConverter.js';
const store = useStore()
const title = ref('Music')
const subTitle = ref('腦波音樂')
const message = ref('請於設定好參數後點選「產生樂譜」按鈕')
const parser = new DOMParser()
const serializer = new XMLSerializer();
let embed = ref()
let musicXml = ref()
const currentData = computed(() => store.getters.currentData)
const instrumentChoices = ref([
    '長笛',
    '上低音薩克斯風',
    '低音大提琴',
    '鋼琴',
    '小提琴',
    '電子吉他',
    '中音薩克斯風',
    '吉他',
    '貝斯',
    '人聲'
])
const highInstrument = ref('小提琴')
const midInstrument = ref('鋼琴')
const lowInstrument = ref('低音大提琴')
const documentTitle = ref('腦波音樂')
const bpm = ref(60)


watch(currentData, (newVal, oldVal) => {
    if (newVal) {
        fetchMusicXML(currentData.value)
    }
})

onMounted(() => {
    if (currentData.value) {
        // fetchMusicXML(currentData.value)
    }
})


function fetchMusicXML() {
    const payload = {
        "title": documentTitle.value,
        "bpm": bpm.value,
        "instrument": {
            "p1": highInstrument.value,
            "p2": midInstrument.value,
            "p3": lowInstrument.value
        },
        "beforeBrainData": {
            "Good Signal Quality(0-100)": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            "Attention": currentData.value.attention.before,
            "Meditation": currentData.value.meditation.before,
            "Delta": currentData.value.delta.before,
            "Theta": currentData.value.theta.before,
            "Low Alpha": currentData.value.lowAlpha.before,
            "High Alpha": currentData.value.highAlpha.before,
            "Low Beta": currentData.value.lowBeta.before,
            "High Beta": currentData.value.highBeta.before,
            "Low Gamma": currentData.value.lowGamma.before,
            "High Gamma": currentData.value.highGamma.before,
        },
        "afterBrainData": {
            "Good Signal Quality(0-100)": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            "Attention": currentData.value.attention.before,
            "Meditation": currentData.value.meditation.before,
            "Delta": currentData.value.delta.before,
            "Theta": currentData.value.theta.before,
            "Low Alpha": currentData.value.lowAlpha.before,
            "High Alpha": currentData.value.highAlpha.before,
            "Low Beta": currentData.value.lowBeta.before,
            "High Beta": currentData.value.highBeta.before,
            "Low Gamma": currentData.value.lowGamma.before,
            "High Gamma": currentData.value.highGamma.before,
        }
    }

    const container = document.getElementById('embed-example')
    if (embed.value) {
        embed.value.stop().then(function () {
            // The playback is stopped
        });
    }
    embed.value = new Embed(container, {
        // score: '56ae21579a127715a02901a6',
        // https://flat.io/developers/apps/638abd901bbf6ba1bb99d620/embed/statistics
        height: '600px',
        embedParams: {
            appId: import.meta.env.VITE_MUSIC_APP_ID,
            layout: 'page',
            branding: false,
            controlsFullscreen: false,
        }
    })
    axios.post('/music', payload).then(function (mxl) {
        // Got the compressed score as an `ArrayBuffer`, load it in the embed
        musicXml = mxl.data
        return embed.value.loadMusicXML(mxl.data)
    }).then(function () {
        // Score loaded in the embed
        message.value = ''
        // convert audio
        doAudioConvert()
    }).catch(function (error) {
        console.error(error)
    })
}


function doAudioConvert() {
    const xmlDoc = parser.parseFromString(musicXml, "text/xml");
    const title = xmlDoc.getElementsByTagName("movement-title")[0].innerHTML;
    embed.value.getMIDI().then(function (midi) {
        const mc = new MidiConverter(midi)

        // convert to midi 
        let midiBlob = mc.convertToMidiBlob()
        let midiSrc = URL.createObjectURL(midiBlob)
        document.getElementById('exportMidi').setAttribute('href', midiSrc)
        document.getElementById('exportMidi').setAttribute('download', title + '.mid')

        // convert to midi 
        let wavBlob = mc.convertToWavBlob()
        let wavSrc = URL.createObjectURL(wavBlob)
        document.getElementById('exportWav').setAttribute('href', wavSrc)
        document.getElementById('exportWav').setAttribute('download', title + '.wav')

        // convert to mp3
        let mp3Url = mc.convertToWavBlob()
        let mp3Src = URL.createObjectURL(mp3Url)
        document.getElementById('exportMp3').setAttribute('href', mp3Src)
        document.getElementById('exportMp3').setAttribute('download', title + '.mp3')
    })
}

</script>

<style scoped></style>