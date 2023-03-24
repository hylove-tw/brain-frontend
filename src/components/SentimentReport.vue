<template>
  <div class="w-full flex">
    <div class="w-full text-center" v-if="sentimentBefore">
      <span class="font-bold">前測</span>
      <chart :options="parseOption(sentimentBefore)" ref="lineCharts1"></chart>
      <div class="table-responsive-sm" v-if="sentimentBefore">
        <div class="overflow-scroll">
          <table class="table table-compact table-striped table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">前測</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sentimentBefore.data" :key="index">
                <th scope="row">T{{ index + 1 }}</th>
                <td>
                  <div class="badge badge-lg" :class="sentimentMap[item.name].colorClass">
                  </div>
                  <sub>{{ item.name }}
                    ({{ item.score }})</sub>
                  {{ sentimentMap[item.name].title }}
                </td>
              </tr>
              <tr class="active">
                <th>平均</th>
                <td>{{ sentimentBefore.sentimentAvg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="w-full text-center" v-if="sentimentAfter">
      <span class="font-bold">後測</span>
      <chart class="w-full" :options="parseOption(sentimentAfter)" ref="lineCharts2"></chart>
      <div class="table-responsive-sm" v-if="sentimentBefore">
        <div class="overflow-scroll">
          <table class="table table-compact table-striped table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">前測</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sentimentAfter.data" :key="index">
                <th scope="row">T{{ index + 1 }}</th>
                <td>
                  <div class="badge badge-lg" :class="sentimentMap[item.name].colorClass">
                  </div>
                  <sub>{{ item.name }}
                    ({{ item.score }})</sub>
                  {{ sentimentMap[item.name].title }}
                </td>
              </tr>
              <tr class="active">
                <th>平均</th>
                <td>{{ sentimentAfter.sentimentAvg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import Utils from '../objects/utils'
import { useStore } from 'vuex'
import { Chart } from 'highcharts-vue'

const store = useStore()
const utils = new Utils()
const sentimentMap = computed(() => store.getters.sentimentMap)
const currentData = computed(() => store.getters.currentData)
const sentimentBefore = ref()
const sentimentAfter = ref()

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


watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getSentiment(currentData.value)
  }
})

function getSentiment() {
  const payload = {
    "beforeBrainData": {
      "Good Signal Quality(0-100)": new Array(currentData.value.attention.before.length).fill(100),
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
  if (currentData.value.hasAfterData) {
    payload.afterBrainData = {
      "Good Signal Quality(0-100)": new Array(currentData.value.attention.after.length).fill(100),
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

  // path: /analysis/sentiment
  axios.post('/analysis/sentiment', payload).then((res) => {
    sentimentBefore.value = res.data.sentimentBefore
    sentimentAfter.value = res.data.sentimentAfter
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

<style scoped></style>
