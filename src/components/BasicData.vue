<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="card bg-white border p-2 lg:p-4" v-for="factor in factors">
      <div class="card-body p-0 lg:p-2">
        <Factor :factor-data="factor.data" :factor-name="factor.name" v-if="brainData"></Factor>
      </div>
    </div>
  </div>
</template>

<script setup>
import Factor from './Factor.vue'
import { ref, onMounted } from "vue";
import axios from "axios";
const factors = ref()
const props = defineProps({
  brainData: Object
})

function getBrainFeatures() {
  // test data
  const payload = {
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
  }
  // path: /analysis/brain_features
  axios.post('/analysis/brain_features', payload).then((res) => {
    factors.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  getBrainFeatures()
})

</script>

<style scoped>

</style>
