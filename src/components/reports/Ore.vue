<template>
  <div>
    <h5 class="text-center text-2xl">礦物結晶體驗證模式</h5>
    <div v-if="oreData">
      <div class="card my-4">
        <div class="card-body pt-0">
          <h5 class="card-title justify-center text-xl">分析結果</h5>
          <div class="py-2">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">Delta</div>
                  <div class="py-2">- {{ oreData.delta }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">Theta</div>
                  <div class="py-2">- {{ oreData.theta }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowAlpha</div>
                  <div class="py-2">- {{ oreData.lowAlpha }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighAlpha</div>
                  <div class="py-2">- {{ oreData.highAlpha }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowBeta</div>
                  <div class="py-2">- {{ oreData.lowBeta }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighBeta</div>
                  <div class="py-2">- {{ oreData.highBeta }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowGamma</div>
                  <div class="py-2">- {{ oreData.lowGamma }}</div>
                </div>
              </div>
              <div class="card bg-white shadow">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighGamma</div>
                  <div class="py-2">- {{ oreData.highGamma }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-2 text-center" v-else>
      <span>無前測資料</span>
      <span>無後測資料</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";
const oreData = ref()

const props = defineProps({
  brainData: Object
})

function getOreData() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  // axios.post('/ore')
  axios.post('/ore', {
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
    oreData.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  getOreData()
})
</script>
<style scoped>

</style>
