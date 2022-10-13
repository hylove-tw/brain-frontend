<template>
  <div class="table-responsive-sm py-4" v-for="item in factors">

    <div class="divider">{{item.name}}</div>
    <div class="overflow-scroll">
      <table class="table table-striped table-bordered w-full">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" class="text-xs" colspan="1" v-for="factor in item.data">{{ factor.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in maxFactorRows">
            <th scope="row">T{{ index }}</th>
            <td class="text-center" v-for="factor in item.data">
              {{ factor.data[index] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
const factors = ref()
const props = defineProps({
  brainData: Object
})

const maxFactorRows = computed(() => {
  let max = 0
  factors.value.forEach(item => {
    if (item.data.length > max) {
      max = item.data.length
    }
  })
  return max
})

function getDigitalFeatures() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  // axios.post('/analysis/digitalFeatures')
  axios.post('/analysis/digital_features', {
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
  getDigitalFeatures()
})
</script>

<style scoped>

</style>
