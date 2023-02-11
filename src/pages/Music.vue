<template>
    <div>
        <div class="px-4 flex w-full justify-start items-center">
            <header class="py-4 md:py-6 flex flex-col justify-start">
                <h2 class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
                <h3 class="text-md">{{ subTitle }}</h3>
            </header>
            <div></div>
        </div>
        <div>{{ message }}</div>
        <div v-show="currentData">
            <input id="sheetTitle" placeholder="輸入標題">
            <input id="soundTempo" placeholder="輸入速度" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
            <button type="button" @click="editMusicxml" style="border: 2px solid black">修改樂譜</button>
            <a id="exportMidi" style="border: 2px solid black">Export MIDI</a>
            <a id="exportWav" style="border: 2px solid black">Export WAV</a>
            <a id="exportMp3" style="border: 2px solid black">Export MP3</a>
        </div>
        <div id="embed-example"></div>
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
const message = ref('讀取中...')
const parser = new DOMParser()
const serializer = new XMLSerializer();
let embed = ref()
let musicXml = ref()
const currentData = computed(() => store.getters.currentData)

watch(currentData, (newVal, oldVal) => {
    if (newVal) {
        fetchMusicXML(currentData.value)
    }
})

onMounted(() => {
    if (currentData.value) {
        fetchMusicXML(currentData.value)
    }
})


function fetchMusicXML() {
    const payload = {
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
    embed = new Embed(container, {
        // score: '56ae21579a127715a02901a6',
        // https://flat.io/developers/apps/638abd901bbf6ba1bb99d620/embed/statistics
        height: '500px',
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
        return embed.loadMusicXML(mxl.data)
    }).then(function () {
        // Score loaded in the embed
        message.value = ''
        // convert audio
        doAudioConvert()
    }).catch(function (error) {
        console.error(error)
    })
}

function editMusicxml() {
    let hasChange = false;
    const xmlDoc = parser.parseFromString(musicXml, "text/xml");
    const newTitle = document.getElementById("sheetTitle").value.trim()
    const soundTempo = parseInt(document.getElementById("soundTempo").value)

    // edit sheet title
    if (newTitle != "") {
        xmlDoc.getElementsByTagName("movement-title")[0].innerHTML = newTitle
        hasChange = true;
        // change audio file name
        document.getElementById('exportMidi').setAttribute('download', newTitle + '.mid')
        document.getElementById('exportWav').setAttribute('download', newTitle + '.wav')
    }

    // edit sound temple
    if (soundTempo > 0) {
        xmlDoc.getElementsByTagName("per-minute")[0].innerHTML = soundTempo
        xmlDoc.getElementsByTagName("sound")[0].setAttribute("tempo", soundTempo)
        hasChange = true;
    }

    const newXml = serializer.serializeToString(xmlDoc)
    if (hasChange) {
        embed.loadMusicXML(newXml)
    }

}

function doAudioConvert() {
    const xmlDoc = parser.parseFromString(musicXml, "text/xml");
    const title = xmlDoc.getElementsByTagName("movement-title")[0].innerHTML;
    embed.getMIDI().then(function (midi) {
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

<style scoped>

</style>