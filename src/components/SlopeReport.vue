<template>
  <div class="table-responsive-sm" v-if="tableData">
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
          <tr v-for="(item, index) in tableData" :key="index">
            <th scope="row">T{{ index + 1 }}</th>
            <td>
              {{ item.attention[0] }}
            </td>
            <td>
              {{ item.attention[1] }}
            </td>
            <td>
              {{ item.meditation[0] }}
            </td>
            <td>
              {{ item.meditation[1] }}
            </td>
            <td>
              {{ item.delta[0] }}
            </td>
            <td>
              {{ item.delta[1] }}
            </td>
            <td>
              {{ item.theta[0] }}
            </td>
            <td>
              {{ item.theta[1] }}
            </td>
            <td>
              {{ item.lowAlpha[0] }}
            </td>
            <td>
              {{ item.lowAlpha[1] }}
            </td>
            <td>
              {{ item.highAlpha[0] }}
            </td>
            <td>
              {{ item.highAlpha[1] }}
            </td>
            <td>
              {{ item.lowBeta[0] }}
            </td>
            <td>
              {{ item.lowBeta[1] }}
            </td>
            <td>
              {{ item.highBeta[0] }}
            </td>
            <td>
              {{ item.highBeta[1] }}
            </td>
            <td>
              {{ item.lowGamma[0] }}
            </td>
            <td>
              {{ item.lowGamma[1] }}
            </td>
            <td>
              {{ item.highGamma[0] }}
            </td>
            <td>
              {{ item.highGamma[1] }}
            </td>
          </tr>
        </tbody>
        <thead v-if="slopeSyncRate.data">
          <tr class="table-secondary">
            <th scope="row">同步率</th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.attention }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.meditation }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.delta }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.theta }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.lowAlpha }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.highAlpha }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.lowBeta }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.highBeta }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.lowGamma }}
            </th>
            <th scope="col" colspan=2>
              {{ slopeSyncRate.highGamma }}
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
const tableData = ref({})
const slopeSyncRate = ref({})

watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getSlopes(currentData.value)
  }
})
function getSlopes() {
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

  // path: /analysis/slope
  axios.post('/analysis/slope', payload).then((res) => {
    let slopeBefore = res.data[0]
    let slopeAfter = res.data[1]
    slopeSyncRate.value = res.data[2]
    tableData.value = slopeBefore.data.map((v, idx) => {
      return {
        'attention': [v.attention, slopeAfter.data ? slopeAfter.data[idx].attention : ''],
        'meditation': [v.meditation, slopeAfter.data ? slopeAfter.data[idx].meditation : ''],
        'delta': [v.delta, slopeAfter.data ? slopeAfter.data[idx].delta : ''],
        'theta': [v.theta, slopeAfter.data ? slopeAfter.data[idx].theta : ''],
        'lowAlpha': [v.lowAlpha, slopeAfter.data ? slopeAfter.data[idx].lowAlpha : ''],
        'highAlpha': [v.highAlpha, slopeAfter.data ? slopeAfter.data[idx].highAlpha : ''],
        'lowBeta': [v.lowBeta, slopeAfter.data ? slopeAfter.data[idx].lowBeta : ''],
        'highBeta': [v.highBeta, slopeAfter.data ? slopeAfter.data[idx].highBeta : ''],
        'lowGamma': [v.lowGamma, slopeAfter.data ? slopeAfter.data[idx].lowGamma : ''],
        'highGamma': [v.highGamma, slopeAfter.data ? slopeAfter.data[idx].highGamma : ''],
      }
    })
    console.log(tableData.value)
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

<style scoped></style>
