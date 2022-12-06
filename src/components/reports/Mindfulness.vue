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
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useStore } from 'vuex'
const store = useStore()
const currentData = computed(() => store.getters.currentData)
const mindfulnessData = ref()

watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getMindfulnessData()
  }
})

function getMindfulnessData() {
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

  // path: /mindfulness
  axios.post('/mindfulness', payload).then((res) => {
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
