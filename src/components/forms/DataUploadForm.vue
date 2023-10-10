<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import domtoimage from 'dom-to-image';
import MultiStepForm from './MultiStepForm.vue'
const props = defineProps({
    subModeOptions: {
        default: {
            0: '五感測試',
            1: '礦物結晶體驗證模式',
            2: '正念修行驗證模式',
            3: 'H.R評估參考模式',
            4: '天賦潛能評估模式',
        }
    },
    subMode: {
        default: '五感測試'
    }
})
const store = useStore()
const dataRows = computed(() => {
    const originalRows = store.getters.dataRowList;
    console.log(originalRows)
    return originalRows.filter(row => Object.values(props.subModeOptions).includes(row.subMode));
});

const currentDataIndex = computed(() => {
    const originalIndex = store.getters.currentDataIndex;

    // 檢查原始的index是否符合subModeOptions
    const submodeAtOriginalIndex = store.getters.dataRowList[originalIndex]?.subMode;
    if (Object.values(props.subModeOptions).includes(submodeAtOriginalIndex)) {
        return originalIndex;
    }

    // 如果不符合，找到過濾後的dataRows中的最後一個符合的index
    const lastIndexInFilteredRows = dataRows.value.length - 1;
    if (lastIndexInFilteredRows >= 0) {
        const lastRowInFilteredRows = dataRows.value[lastIndexInFilteredRows];
        return store.getters.dataRowList.findIndex(row => row === lastRowInFilteredRows);
    }

    // 如果過濾後的dataRows是空的，則返回undefined或其他適當的值
    return undefined;
});
function isSubModeInOptions(subModeValue) {
    return Object.values(props.subModeOptions).includes(subModeValue);
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
                <h2>上傳紀錄</h2>
                <MultiStepForm :sub-mode-options="props.subModeOptions" :sub-mode="props.subMode"></MultiStepForm>
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