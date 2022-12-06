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
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex'
import axios from "axios";
const store = useStore();
const currentData = computed(() => store.getters.currentData)
const oreData = ref()

watch(currentData, (newVal, oldVal) => {
  if (newVal) {
    getOreData()
  }
})

function getOreData() {
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

  // path: /ore
  axios.post('/ore', payload).then((res) => {
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
