<template>
  <div>
    <h5 class="text-center text-2xl">H.R潛能評估參考模式</h5>
    <div v-if="humanResourceData">
      <div class="card my-4">
        <div class="card-body pt-0">
          <h5 class="card-title justify-center text-xl">分析結果</h5>
          <div class="grid grid-cols-3 gap-2">
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.lowBeta.comment }}</span>
              <span class="text-lg font-bold">業務帖展</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.lowBeta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.delta.comment }}</span>
              <span class="text-lg font-bold">領導統御</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.delta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.lowGamma.comment }}</span>
              <span class="text-lg font-bold">生產管理</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.lowGamma.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.highBeta.comment }}</span>
              <span class="text-lg font-bold">公關行銷</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.highBeta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><span class="font-bold">總能量</span><br>{{ humanResourceData.TEScore }}</span>
              <span><span class="font-bold">情緒平均分數</span><br>{{ humanResourceData.sentimentBeforeAvg }} / {{
              humanResourceData.sentimentAfterAvg
              }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.lowAlpha.comment }}</span>
              <span class="text-lg font-bold">研發整合</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.lowAlpha.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.theta.comment }}</span>
              <span class="text-lg font-bold">創新發展</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.theta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.highGamma.comment }}</span>
              <span class="text-lg font-bold">任務執行</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.highGamma.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ humanResourceData.highAlpha.comment }}</span>
              <span class="text-lg font-bold">人事行政</span>
              <span><sub>潛能評分</sub><br>{{ humanResourceData.highAlpha.predict }}</span>
            </div>
          </div>
          <div class="text-xs text-gray-500 pt-2">
            <span class="font-bold">潛能評估 ABC 代表意義:</span>
            <ul>
              <li>A. 有非常好的發展潛能</li>
              <li>B. 尚有潛能發展空間</li>
              <li>C. 潛能發展空間有限</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="py-2 text-center" v-else>
      <span v-if="brainData.fileInput.before===null">無前測資料</span>
      <span v-if="brainData.fileInput.after===null">無後測資料</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from "axios";
import { computed } from '@vue/reactivity';
const store = useStore();
const humanResourceData = ref()
const brainData = computed(() => {
  const data = store.getters.currentData
  console.log(data)
  return data
})
const props = defineProps({
  brainData: Object
})
function getHumanResourceData() {
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

  // path: /human_resource_data
  axios.post('/human_resource_data', payload).then((res) => {
    humanResourceData.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}
watch(brainData, (newVal, oldVal) => {
  getHumanResourceData()
})
onMounted(() => {
  getHumanResourceData()
})
</script>

<style scoped>

</style>