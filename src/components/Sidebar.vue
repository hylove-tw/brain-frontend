<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const dataRows = computed(() => store.getters.dataRowList)
const currentDataIndex = computed(() => store.getters.currentDataIndex)

</script>
  
<template>
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
    </div>
    <div class="card-body" v-else>
        <h3 class="card-title">尚無紀錄</h3>
    </div>
</template>