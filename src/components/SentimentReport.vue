<template>
  <div class="flex">
    <div class="w-full text-center">
      <span class="font-bold">前測</span>
      <chart :options="parseOption(factors.sentimentBefore)" ref="lineCharts1" v-if="factors"></chart>
    </div>
    <div class="w-full text-center">
      <span class="font-bold">後測</span>
      <chart :options="parseOption(factors.sentimentAfter)" ref="lineCharts2" v-if="factors"></chart>
    </div>
  </div>
  <div class="table-responsive-sm" v-if="factors">
    <div class="overflow-scroll">
      <table class="table table-compact table-striped table-bordered w-full">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">前測</th>
            <th scope="col">後測</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in factors.sentimentBefore.data || factors.sentimentAfter.data" :key="index">
            <th scope="row">T{{ index + 1 }}</th>
            <td v-if="factors.sentimentBefore.data">
              <div class="badge badge-lg" :class="sentimentMap[factors.sentimentBefore.data[index].name].colorClass">
              </div>
              <sub>{{ factors.sentimentBefore.data[index].name }}
                ({{ factors.sentimentBefore.data[index].score }})</sub>
              {{ sentimentMap[factors.sentimentBefore.data[index].name].title }}
            </td>
            <td v-else> -</td>
            <td v-if="factors.sentimentAfter.data">
              <div class="badge badge-lg" :class="sentimentMap[factors.sentimentAfter.data[index].name].colorClass">
              </div>
              <sub>{{ factors.sentimentAfter.data[index].name }}
                ({{ factors.sentimentAfter.data[index].score }})</sub>
              {{ sentimentMap[factors.sentimentAfter.data[index].name].title }}

            </td>
            <td v-else> -</td>
          </tr>
          <tr class="active">
            <th>平均</th>
            <td>{{ factors.sentimentBefore.sentimentAvg }}</td>
            <td>{{ factors.sentimentAfter.sentimentAvg }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import Utils from '../objects/utils'
import { useStore } from 'vuex'
import { Chart } from 'highcharts-vue'

const store = useStore()
const utils = new Utils()
const factors = ref()
const props = defineProps({
  brainData: Object
})

const sentimentMap = computed(() => store.getters.sentimentMap)

function parseOption(factors) {
  const data = getSentimentChartArray(factors.data)
  const sentimentAvg = factors.sentimentAvg
  return {
    chart: {
      width: null,
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      // text: 'Source: AI-Mind Power'
    },
    xAxis: {
      title: {
        text: '時間(T)'
      }
    },
    yAxis: {
      mix: 6,
      min: -6,
      startOnTick: false,
      tickPositions: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6],
      title: {
        text: '情緒分數'
      },
      plotLines: [{
        label: { text: `平均：${sentimentAvg}` },
        color: 'red',
        value: sentimentAvg,
        width: '1',
        zIndex: 4 // To not get stuck below the regular plot lines or series
      }]
    },
    series: [
      {
        name: '情緒分數',
        data: data.map((item) => {
          // console.log(item)
          return { name: item.title, y: item.score, borderColor: item.borderColor, color: item.color }
        }),
        pointWidth: 2,
      }
    ]
  }
}

function getSentiment() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  // axios.post('/analysis/sentiment')
  axios.post('/analysis/sentiment', {
    "beforeBrainData": {
      "Good Signal Quality(0-100)": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      "Attention": props.brainData.attention.before,
      "Meditation": props.brainData.meditation.before,
      "Delta": props.brainData.delta.before,
      "Theta": props.brainData.theta.before,
      "Low Alpha": props.brainData.lowAlpha.before,
      "High Alpha": props.brainData.highAlpha.before,
      "Low Beta": props.brainData.lowBeta.before,
      "High Beta": props.brainData.highBeta.before,
      "Low Gamma": props.brainData.lowGamma.before,
      "High Gamma": props.brainData.highGamma.before,
    },
    "afterBrainData": {
      "Good Signal Quality(0-100)": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      "Attention": props.brainData.attention.after,
      "Meditation": props.brainData.meditation.after,
      "Delta": props.brainData.delta.after,
      "Theta": props.brainData.theta.after,
      "Low Alpha": props.brainData.lowAlpha.after,
      "High Alpha": props.brainData.highAlpha.after,
      "Low Beta": props.brainData.lowBeta.after,
      "High Beta": props.brainData.highBeta.after,
      "Low Gamma": props.brainData.lowGamma.after,
      "High Gamma": props.brainData.highGamma.after,
    }
  }).then((res) => {
    factors.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  getSentiment()
})

function getSentimentChartArray(sentimentData) {
  if (sentimentData) {
    const tmp = []
    sentimentData.forEach((item) => {
      const tmp2 = utils.sentimentMap[item.name]
      tmp2.score = item.score
      tmp.push(tmp2)
    })
    return tmp
  } else {
    return 0
  }
}
</script>

<style scoped>

</style>
