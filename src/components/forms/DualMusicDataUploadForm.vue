<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import domtoimage from 'dom-to-image';
import DualMusicMultiStepForm from './DualMusicMultiStepForm.vue'

const store = useStore()
const dataRows = computed(() => store.getters.dataRowList)
const currentDataIndex = computed(() => store.getters.currentDataIndex)
const subMode = ref('雙人腦波音樂')
const subModeOptions = ref({ 1: '雙人腦波音樂' })

function isSubModeInOptions(subModeValue) {
    return Object.values(subModeOptions.value).includes(subModeValue);
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

function switchData(idx) {
    store.commit('setCurrentDataIndex', idx)
}

function removeItem(idx) {
    store.dispatch('removeDataItem', idx)
    store.commit('setCurrentDataIndex', idx > 0 ? idx - 1 : 0)
}

function resetDataRows() {
    store.dispatch('resetDataRows')
    store.commit('setCurrentDataIndex', 0)
}
</script>
<template>
    <div class="card-body">
        <div class="divider"></div>
        <div class="card-title">
            <div class="flex flex-col xl:flex-row justify-between items-center w-full gap-2">
                <DualMusicMultiStepForm :sub-mode-options="subModeOptions" :sub-mode="subMode">
                </DualMusicMultiStepForm>
            </div>
        </div>
        <ul>
            <li v-for="(row, idx) in dataRows" :key="idx">
                <div class="flex justify-between items-center border-b py-1 my-1" v-if="isSubModeInOptions(row.subMode)">
                    <span class="link" @click="switchData(idx)" :class="idx === currentDataIndex ? 'font-bold' : ''">
                        {{ row.name }} <small>({{ row.subMode }})</small>
                    </span>
                    <div class="btn btn-ghost" @click="removeItem(idx)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
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
</template>