<template>
    <div>
        <div class="px-4 flex w-full justify-start items-center">
            <header class="py-4 md:py-6 flex flex-col justify-start">
                <h2 class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
                <h3 class="text-md">{{ subTitle }}</h3>
            </header>
            <div></div>
        </div>
        <div id="embed-example"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'

import Embed from 'flat-embed';
import axios from 'axios';
const store = useStore()
const title = ref('Music')
const subTitle = ref('腦波音樂')

const currentData = computed(() => store.getters.currentData)

watch(currentData, (newVal, oldVal) => {
    console.log('newVal', newVal)
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
            "Attention": currentData.value.attention.after,
            "Meditation": currentData.value.meditation.after,
            "Delta": currentData.value.delta.after,
            "Theta": currentData.value.theta.after,
            "Low Alpha": currentData.value.lowAlpha.after,
            "High Alpha": currentData.value.highAlpha.after,
            "Low Beta": currentData.value.lowBeta.after,
            "High Beta": currentData.value.highBeta.after,
            "Low Gamma": currentData.value.lowGamma.after,
            "High Gamma": currentData.value.highGamma.after,
        }
    }

    const container = document.getElementById('embed-example')
    const embed = new Embed(container, {
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
        console.log(mxl)
        // Got the compressed score as an `ArrayBuffer`, load it in the embed
        return embed.loadMusicXML(mxl.data)
    }).then(function () {
        // Score loaded in the embed
    }).catch(function (error) {
        console.error(error)
    })
}
</script>

<style scoped>

</style>