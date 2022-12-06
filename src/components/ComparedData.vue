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
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex'
import axios from "axios";
const factors = ref()
const store = useStore()
const currentData = computed(() => store.getters.currentData)

watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getComparedFeatures(currentData.value)
  }
})
function getComparedFeatures() {
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

  // path: /analysis/compared_features
  axios.post('/analysis/compared_features', payload).then((res) => {
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
