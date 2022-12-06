<template>
  <div class="table-responsive-sm" v-if="factors">
    <div class="overflow-scroll">
      <table class="table table-striped table-bordered w-full">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colspan="2">Attention</th>
            <th scope="col" colspan="2">Meditation</th>
            <th scope="col" colspan="2">Delta</th>
            <th scope="col" colspan="2">Theta</th>
            <th scope="col" colspan="2">Low Alpha</th>
            <th scope="col" colspan="2">High Alpha</th>
            <th scope="col" colspan="2">Low Beta</th>
            <th scope="col" colspan="2">High Beta</th>
            <th scope="col" colspan="2">Low Gamma</th>
            <th scope="col" colspan="2">High Gamma</th>
          </tr>
        </thead>
        <tbody>
          <!--      {{brainData.attention.reportData.slopeBefore.value }}-->
          <tr v-for="(item, index) in factors[0].data" :key="index">
            <th scope="row">T{{ index + 1 }}</th>
            <td :class="getColStyle(item.attention[2])">
              {{ item.attention[0] }}
            </td>
            <td :class="getColStyle(item.attention[2])">
              {{ item.attention[1] }}
            </td>
            <td :class="getColStyle(item.meditation[2])">
              {{ item.meditation[0] }}
            </td>
            <td :class="getColStyle(item.meditation[2])">
              {{ item.meditation[1] }}
            </td>
            <td :class="getColStyle(item.delta[2])">
              {{ item.delta[0] }}
            </td>
            <td :class="getColStyle(item.delta[2])">
              {{ item.delta[1] }}
            </td>
            <td :class="getColStyle(item.theta[2])">
              {{ item.theta[0] }}
            </td>
            <td :class="getColStyle(item.theta[2])">
              {{ item.theta[1] }}
            </td>
            <td :class="getColStyle(item.lowAlpha[2])">
              {{ item.lowAlpha[0] }}
            </td>
            <td :class="getColStyle(item.lowAlpha[2])">
              {{ item.lowAlpha[1] }}
            </td>
            <td :class="getColStyle(item.highAlpha[2])">
              {{ item.highAlpha[0] }}
            </td>
            <td :class="getColStyle(item.highAlpha[2])">
              {{ item.highAlpha[1] }}
            </td>
            <td :class="getColStyle(item.lowBeta[2])">
              {{ item.lowBeta[0] }}
            </td>
            <td :class="getColStyle(item.lowBeta[2])">
              {{ item.lowBeta[1] }}
            </td>
            <td :class="getColStyle(item.highBeta[2])">
              {{ item.highBeta[0] }}
            </td>
            <td :class="getColStyle(item.highBeta[2])">
              {{ item.highBeta[1] }}
            </td>
            <td :class="getColStyle(item.lowGamma[2])">
              {{ item.lowGamma[0] }}
            </td>
            <td :class="getColStyle(item.lowGamma[2])">
              {{ item.lowGamma[1] }}
            </td>
            <td :class="getColStyle(item.highGamma[2])">
              {{ item.highGamma[0] }}
            </td>
            <td :class="getColStyle(item.highGamma[2])">
              {{ item.highGamma[1] }}
            </td>
          </tr>
        </tbody>
        <thead>
          <tr class="table-secondary">
            <th scope="row">同步率</th>
            <th scope="col" colspan=2>
              {{ factors[1].data.attention }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.meditation }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.delta }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.theta }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.lowAlpha }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.highAlpha }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.lowBeta }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.highBeta }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.lowGamma }}
            </th>
            <th scope="col" colspan=2>
              {{ factors[1].data.highGamma }}
            </th>
          </tr>
        </thead>
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
    getSlopes(currentData.value)
  }
})
function getSlopes() {
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
  
  // path: /analysis/slope
  axios.post('/analysis/slope', payload).then((res) => {
    factors.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  getSlopes()
})

const getColStyle = (value) => {
  return value ? 'table-primary' : ''
}
</script>

<style scoped>

</style>
