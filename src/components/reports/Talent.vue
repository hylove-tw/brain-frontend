<template>
  <div>
    <h5 class="text-center text-2xl">天賦潛能評估模式</h5>
    <div v-if="talentData">
      <div class="card my-4">
        <div class="card-body pt-0">
          <h5 class="card-title justify-center text-xl">分析結果</h5>
          <div class="grid grid-cols-3 gap-2">
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.theta.comment }}</span>
              <span class="text-xl font-bold">創新藝術</span>
              <span><sub>潛能評分</sub><br>{{ talentData.theta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.delta.comment }}</span>
              <span class="text-xl font-bold">自然科學</span>
              <span><sub>潛能評分</sub><br>{{ talentData.delta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.lowBeta.comment }}</span>
              <span class="text-xl font-bold">活潑合群</span>
              <span><sub>潛能評分</sub><br>{{ talentData.lowBeta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.lowAlpha.comment }}</span>
              <span class="text-xl font-bold">邏輯判斷</span>
              <span><sub>潛能評分</sub><br>{{ talentData.lowAlpha.predict }}</span>
            </div>
            <div class="report-cell">
              <span><span class="font-bold">總能量</span><br>{{ talentData.TEScore }}</span>
              <span><span class="font-bold">情緒平均分數</span><br>{{ talentData.sentimentBeforeAvg }} / {{
              talentData.sentimentAfterAvg
              }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.highBeta.comment }}</span>
              <span class="text-xl font-bold">社交公關</span>
              <span><sub>潛能評分</sub><br>{{ talentData.highBeta.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.highAlpha.comment }}</span>
              <span class="text-xl font-bold">記憶計算</span>
              <span><sub>潛能評分</sub><br>{{ talentData.highAlpha.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.highGamma.comment }}</span>
              <span class="text-xl font-bold">機智反應</span>
              <span><sub>潛能評分</sub><br>{{ talentData.highGamma.predict }}</span>
            </div>
            <div class="report-cell">
              <span><sub>現況評分</sub><br>{{ talentData.lowGamma.comment }}</span>
              <span class="text-xl font-bold">堅毅忍耐</span>
              <span><sub>潛能評分</sub><br>{{ talentData.lowGamma.predict }}</span>
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
import { onMounted, ref } from 'vue'
import axios from "axios";
const talentData = ref()
const props = defineProps({
  brainData: Object
})
function getTalentData() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  axios.post('/talent', {
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
    talentData.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}
onMounted(() => {
  getTalentData()
})
</script>

<style scoped>

</style>