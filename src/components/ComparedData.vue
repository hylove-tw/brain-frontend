<template>
  <div class="table-responsive-sm">
    <div class="overflow-scroll">
      <table class="table table-striped table-bordered w-full">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-for="factor in factors">{{ factor.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">前測平均值</th>
            <td v-for="factor in factors">{{ factor.comparedData.avg.before }}</td>
          </tr>
          <tr>
            <th scope="row">前測振幅</th>
            <td v-for="factor in factors">{{ factor.comparedData.amplitude.before }}</td>
          </tr>
          <tr>
            <th scope="row">後測平均值</th>
            <td v-for="factor in factors">{{ factor.comparedData.avg.after }}</td>
          </tr>
          <tr>
            <th scope="row">後測振幅</th>
            <td v-for="factor in factors">{{ factor.comparedData.amplitude.after }}</td>
          </tr>
          <tr>
            <th scope="row">後測比前測</th>
            <td v-for="factor in factors">{{ factor.comparedData.avg.afterBefore }}</td>
          </tr>
          <tr>
            <th scope="row">前測比後測</th>
            <td v-for="factor in factors">{{ factor.comparedData.avg.beforeAfter }}</td>
          </tr>
          <tr>
            <th scope="row">前測振幅比</th>
            <td v-for="factor in factors">{{ factor.comparedData.amplitudeAvg.before }}</td>
          </tr>
          <tr>
            <th scope="row">後測振幅比</th>
            <td v-for="factor in factors">{{ factor.comparedData.amplitudeAvg.after }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const factors = ref()
const props = defineProps({
  brainData: Object
})

function getComparedFeatures() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  // axios.post('/analysis/comparedFeatures')
  axios.post('/analysis/compared_features', {
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
  getComparedFeatures()
})
</script>

<style scoped>

</style>
