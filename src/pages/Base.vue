<template>
  <div class="drawer min-h-screen">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-100 shadow-lg lg:justify-center">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="w-full flex justify-between max-w-7xl">
          <div class="flex-1 px-2 mx-2">
            <div class="flex">
              <a class="
                        text-xl
                        font-bold
                        text-primary
                        cursor-pointer
                        md:text-2xl
                        hover:text-gray-700
                      " @click="routeTo({ name: 'Welcome' })">
                AI-Mind Power
                <sub class="font-light text-sm text-gray-500">v{{ version }}</sub>
              </a>
            </div>
          </div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              <li v-for="(item, idx) in navItems" :key="idx">
                <a @click="routeTo(item.routeData)">{{ item.name }}</a>
              </li>
              <li class="border border-error text-error" v-if="user">
                <a @click="logout">登出</a>
              </li>
              <li class="border border-primary text-primary" v-else>
                <a @click="routeTo({ name: 'Login' })">登入</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Page content here -->
      <div class="flex flex-col items-center h-full justify-between" v-if="isAuthenticated">
        <div class="p-4 w-full max-w-7xl pb-8">
          <div class="grid grid-cols-1 lg:grid-cols-4 space-y-4 lg:gap-6 lg:space-y-0">
            <div class="flex flex-col w-full">
              <div class="card bg-base-100 shadow-xl">
                <div class="card-body" v-if="dataRows?.length">
                  <h2 class="card-title">{{ dataRows[currentDataIndex].name }}</h2>
                  <div class="flex flex-col leading-10">
                    <div class="border-b mb-1">example@hylove.com.tw</div>
                    <div class="border-b mb-1">手機：0912345678</div>
                    <div class="border-b mb-1">性別：{{ dataRows[currentDataIndex].gender }}</div>
                    <div class="border-b mb-1">年齡：{{ dataRows[currentDataIndex].age }}歲</div>
                    <div class="border-b mb-1">藍芽序號： 50005403</div>
                    <div class="border-b mb-1">藍芽裝置： Brain Link</div>
                  </div>
                  <button class="btn btn-sm btn-outline" @click="downloadHtml">下載分析結果</button>
                </div>
                <div class="card-body" v-else>
                  <h3 class="card-title">尚無紀錄</h3>
                </div>
                <div class="card-body">
                  <div class="divider"></div>
                  <div class="card-title">
                    <div class="flex flex-col xl:flex-row justify-between items-center w-full gap-2">
                      <h2>上傳紀錄</h2>
                      <MultiStepForm :sub-mode-options="subModeOptions"></MultiStepForm>
                    </div>
                  </div>
                  <ul>
                    <li class="flex justify-between items-center border-b py-1 my-1" v-for="(row, idx) in dataRows"
                      :key="idx">
                      <span class="link" @click="switchData(idx)" :class="idx === currentDataIndex ? 'font-bold' : ''">
                        {{ row.name }}
                      </span>
                      <div class="btn btn-ghost" @click="removeItem(idx)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </li>
                  </ul>
                  <div class="flex mt-4 justify-end">
                    <label for="resetModal" class="btn btn-error btn-sm btn-outline modal-button"
                      v-if="dataRows?.length">全部重置</label>
                    <input type="checkbox" id="resetModal" class="modal-toggle">
                    <div class="modal">
                      <div class="modal-box">
                        <p>確定要清除所有使用者資料嗎？</p>
                        <div class="modal-action">
                          <label for="resetModal" @click="resetDataRows" class="btn btn-error">是</label>
                          <label for="resetModal" class="btn">否</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:col-span-3" ref="targetElement">
              <router-view></router-view>
            </div>
          </div>
        </div>
        <footer class="bottom-0 footer items-center justify-center p-4 bg-primary text-primary-content">
          <div class="items-center grid-flow-col">
            <p><a class="link" href="https://www.ai-amct.com/www.html" target="_blank">海納福企業 HyLove Business, Inc.</a> ©
              2022 - All right reserved</p>
          </div>
        </footer>
      </div>
      <div id="anonymous" v-else>
        <router-view></router-view>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li v-for="(item, idx) in navItems" :key="idx">
          <a @click="routeTo(item.routeData)">{{ item.name }}</a>
        </li>
        <li class="border border-error text-error" v-if="isAuthenticated">
          <a class="btn-ou" @click="logout">登出</a>
        </li>
        <li class="border border-primary text-primary" v-else>
          <a @click="routeTo({ name: 'Login' })">登入</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import MultiStepForm from '../components/MultiStepForm.vue'

const store = useStore()
const version = computed(() => __APP_VERSION__)
const user = computed(() => store.getters.stateUser)
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const dataRows = computed(() => store.getters.dataRowList)
const currentDataIndex = computed(() => store.getters.currentDataIndex)
const subModeOptions = computed(() => store.getters.subModeOptions)
const router = useRouter()
const route = useRoute()
const targetElement = ref(null)
const navItems = ref([
  {
    name: '腦波分析',
    routeData: { name: 'Home' }
  },
  {
    name: '腦波音樂',
    routeData: { name: 'Music' }
  },
  {
    name: '腦波NFT',
    routeData: { name: 'NFT' }
  },
  {
    name: '關於我們',
    routeData: { name: 'About' }
  }
])

function switchData(idx) {
  store.commit('setCurrentDataIndex', idx)
}

function resetDataRows() {
  store.dispatch('resetDataRows')
  store.commit('setCurrentDataIndex', 0)
}

function removeItem(idx) {
  store.dispatch('removeDataItem', idx)
  store.commit('setCurrentDataIndex', idx > 0 ? idx - 1 : 0)
}

function routeTo(routeData) {
  router.push(routeData)
}

function logout() {
  user.value = null
  store.dispatch('logOut')
  router.push({ name: 'Login' })
}

function downloadData(data, exportName = 'raw') {
  let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  let downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

async function downloadHtml() {
  const filename = `${dataRows.value[currentDataIndex.value].name}_report.png`;
  try {
    const node = targetElement.value; // 將目標 HTML 畫面指定為具有特定 ref 的元素

    // 使用 dom-to-image 將目標 HTML 畫面轉換為圖片（如 PNG）
    domtoimage.toBlob(node)
      .then(function (blob) {
        window.saveAs(blob, filename);
      });
  } catch (error) {
    console.error('Failed to download the HTML:', error);
  }
};

onBeforeMount(() => {
})
</script>

<style scoped></style>
