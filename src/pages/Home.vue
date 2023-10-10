<template>
  <div class="p-4 w-full max-w-7xl pb-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 space-y-4 lg:gap-6 lg:space-y-0">
      <div class="flex flex-col w-full">
        <div class="card bg-base-100 shadow-xl">
          <Sidebar />
          <DataUploadForm :sub-mode-options="subModeOptions" :sub-mode="subMode"></DataUploadForm>
        </div>
      </div>
      <div class="md:col-span-3" ref="targetElement">

        <div class="w-full">
          <div class="flex flex-col gap-6">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body pb-2">
                <div class="flex w-full justify-between items-center">
                  <header class="flex flex-col justify-start">
                    <h2 class="text-2xl md:text-4xl font-semibold">Analysis Report</h2>
                    <h3 class="text-md">腦波分析</h3>
                  </header>
                  <div class="flex justify-end space-x-2 items-center">
                    <div class="form-control" v-if="isSalesMode">
                      <select :value="subMode" @change="updateSubMode" class="select select-bordered select-sm">
                        <option v-for="(option, idx) in subModeOptions" :key="idx" :value="option">{{ idx }}.
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="cursor-pointer label space-x-2 items-center">
                        <span class="label-text text-lg font-bold">Hylove</span>
                        <input type="checkbox" class="toggle toggle-lg toggle-primary" v-model="isSalesMode">
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reports" class="grid grid-cols-1 flex justify-center my-2 md:my-4">
                <div class="card bg-base-100">
                  <div class="card-body p-2" v-if="dataRows?.length">
                    <div class="tabs flex justify-center">
                      <a @click="changeTab('report')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'report' }" v-if="subMode !== '五感測試'">分析結果</a>
                      <a @click="changeTab('basicData')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'basicData' }">腦波圖表</a>
                      <a @click="changeTab('compared')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'compared' }" v-if="isSalesMode">比較數值</a>
                      <a @click="changeTab('slope')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'slope' }" v-if="isSalesMode">斜率變化</a>
                      <a @click="changeTab('digital')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'digital' }" v-if="isSalesMode">數位定義</a>
                      <a @click="changeTab('sentiment')" class="tab tab-bordered"
                        :class="{ 'tab-active': activeTab === 'sentiment' }" v-if="isSalesMode">情緒</a>
                    </div>
                    <div class="p-4">
                      <div class="justify-center" v-if="activeTab === 'report'">
                        <!--                    <h5 class="justify-center card-title">分析結果</h5>-->
                        <div class="justify-center">
                          <Mindfulness v-if="subMode === '正念修行驗證模式'" />
                          <Ore v-if="subMode === '礦物結晶體驗證模式'" />
                          <HumanResource v-if="subMode === 'H.R評估參考模式'" />
                          <Talent v-if="subMode === '天賦潛能評估模式'" :brain-data="currentData"></Talent>
                          <Interactive v-if="subMode === '五感互動驗證模式'" :brain-data="currentData"></Interactive>
                        </div>
                      </div>
                      <div class="justify-center" v-if="activeTab === 'basicData'">
                        <!--                    <h5 class="card-title justify-center card-title mb-4">腦波圖表</h5>-->
                        <BasicData />
                      </div>
                      <div class="justify-center" v-if="activeTab === 'compared' && isSalesMode">
                        <!--                    <h5 class="justify-center card-title">基本數值報告</h5>-->
                        <ComparedData />
                      </div>
                      <div class="justify-center" v-if="activeTab === 'slope' && isSalesMode">
                        <!--                    <h5 class="justify-center card-title">斜率變化報告</h5>-->
                        <SlopeReport />
                      </div>
                      <div class="justify-center" v-if="activeTab === 'digital' && isSalesMode">
                        <!--                    <h5 class="justify-center card-title">斜率變化報告</h5>-->
                        <DigitalReport />
                      </div>
                      <div class="justify-center" v-if="activeTab === 'sentiment' && isSalesMode">
                        <!--                    <h5 class="justify-center card-title">斜率變化報告</h5>-->
                        <SentimentReport />
                      </div>
                    </div>
                  </div>
                  <div class="card-body text-center" v-else>
                    <h3 class="card-title"></h3>
                    <p>點選左方「新增紀錄」開始</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import DataUploadForm from '../components/forms/DataUploadForm.vue'
import ComparedData from '../components/ComparedData.vue'
import SlopeReport from '../components/SlopeReport.vue'
import DigitalReport from '../components/DigitalReport.vue'
import SentimentReport from '../components/SentimentReport.vue'
import BasicData from '../components/BasicData.vue'
import Mindfulness from '../components/reports/Mindfulness.vue'
import Ore from '../components/reports/Ore.vue'
import HumanResource from '../components/reports/HumanResource.vue'
import Talent from '../components/reports/Talent.vue'
import Interactive from '../components/reports/Interactive.vue'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { computed } from '@vue/reactivity'

const store = useStore()

const isSalesMode = ref(false)
const salesModeTabs = ref(['basicData', 'slope'])
const subModeOptions = ref({
  0: '五感測試',
  1: '礦物結晶體驗證模式',
  2: '正念修行驗證模式',
  3: 'H.R評估參考模式',
  4: '天賦潛能評估模式',
})

const dataRows = computed(() => {
  const originalRows = store.getters.dataRowList;
  console.log(originalRows)
  return originalRows.filter(row => Object.values(subModeOptions.value).includes(row.subMode));
});


function isSubModeInOptions(subModeValue) {
  return Object.values(subModeOptions.value).includes(subModeValue);
}


const currentData = computed(() => {
  if (isSubModeInOptions(store.getters.currentData.subMode)) {
    return store.getters.currentData
  } else {
    // return last data in dataRows
    return dataRows.value[dataRows.value.length - 1]
  }
})


const subMode = computed(() => {
  if (isSubModeInOptions(store.getters.subMode)) {
    return store.getters.subMode
  } else {
    return currentData.value?.subMode || '五感測試'
  }
})

const activeTab = ref(subMode.value === '五感測試' ? 'basicData' : 'report')

const updateSubMode = (e) => {
  console.log(e.target.value)
  store.commit('setSubMode', e.target.value)
}

const changeTab = (tab) => {
  activeTab.value = tab
}

watch(() => subMode, (newVal) => {
  if (newVal === '五感測試') {
    activeTab.value = 'charts'
  } else {
    activeTab.value = 'report'
  }
})
watch(() => isSalesMode, (newVal, oldVal) => {
  if (oldVal) {
    if (salesModeTabs.value.includes(activeTab.value)) {
      activeTab.value = 'report'
    }
  }
})

</script>
