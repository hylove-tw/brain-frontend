<template>
  <div class="table-responsive-sm py-4" v-for="item in factors">

    <div class="divider">{{ item.name }}</div>
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
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex'
import axios from "axios";
const factors = ref()
const store = useStore()
const currentData = computed(() => store.getters.currentData)


watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getDigitalFeatures(currentData.value)
  }
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

  // path: /analysis/digital_features
  axios.post('/analysis/digital_features', payload).then((res) => {
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
