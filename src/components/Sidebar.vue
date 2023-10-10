<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import domtoimage from 'dom-to-image';

const store = useStore()
const dataRows = computed(() => store.getters.dataRowList)
const currentDataIndex = computed(() => store.getters.currentDataIndex)


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
        <button class="btn btn-sm btn-outline" @click="downloadHtml">下載分析結果</button>
    </div>
    <div class="card-body" v-else>
        <h3 class="card-title">尚無紀錄</h3>
    </div>
</template>