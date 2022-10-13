<template>
  <div>
    <h5 class="text-center text-2xl">正念修行基本數值</h5>
    <div v-if="mindfulnessData">
      <div class="card my-4" v-if="mindfulnessData">
        <div class="card-body pt-0">
          <h5 class="card-title justify-center text-xl">分析結果</h5>
          <h6 class="card-subtitle mb-2 text-muted text-center">
            <b>{{
            mindfulnessData.practiceType
            }}：</b>{{ mindfulnessData.practiceLevel }}
          </h6>
          <div class="py-2 space-y-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">身心指數</div>
                  <div class="py-2">- {{ mindfulnessData.bodyMind?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.bodyMind?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">元氣指數</div>
                  <div class="py-2">- {{ mindfulnessData.vitality?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.vitality?.type }}</div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">Delta</div>
                  <div class="py-2">- {{ mindfulnessData.delta?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.delta?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">Theta</div>
                  <div class="py-2">- {{ mindfulnessData.theta?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.theta?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowAlpha</div>
                  <div class="py-2">- {{ mindfulnessData.lowAlpha?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.lowAlpha?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighAlpha</div>
                  <div class="py-2">- {{ mindfulnessData.highAlpha?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.highAlpha?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowBeta</div>
                  <div class="py-2">- {{ mindfulnessData.lowBeta?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.lowBeta?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighBeta</div>
                  <div class="py-2">- {{ mindfulnessData.highBeta?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.highBeta?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">LowGamma</div>
                  <div class="py-2">- {{ mindfulnessData.lowGamma?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.lowGamma?.type }}</div>
                </div>
              </div>
              <div class="card border border-base-300">
                <div class="card-body p-4 md:p-6">
                  <div class="card-title">HighGamma</div>
                  <div class="py-2">- {{ mindfulnessData.highGamma?.comment }}</div>
                  <div class="py-2">- {{ mindfulnessData.highGamma?.type }}</div>
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
const mindfulnessData = ref()

const props = defineProps({
  brainData: Object
})


function getMindfulnessData() {
  // 實際跟Server串接的時候換成下面這行，因為main.js有設定axios的baseURL了
  // axios.post('/mindfulness')
  axios.post('/mindfulness', {
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
    mindfulnessData.value = res.data
    console.log(mindfulnessData.value)
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  getMindfulnessData()
})
</script>
<style scoped>

</style>
