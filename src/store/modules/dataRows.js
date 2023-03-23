const state = {
    dataRowList: [],
    subMode: '五感測試',
    subModeOptions: {
        0: '五感測試',
        1: '礦物結晶體驗證模式',
        2: '正念修行驗證模式',
        3: 'H.R評估參考模式',
        4: '天賦潛能評估模式',
    },
    currentDataIndex: 0,

    sentimentMap: {
        HP: {
            color: '白色',
            colorClass: 'bg-white border-gray-300',
            title: '心平氣和'
        },
        V3: {
            color: '紅色',
            colorClass: 'bg-red-700 border-red-800',
            title: '極度喜歡'
        },
        V2: {
            color: '淺紅色',
            colorClass: 'bg-red-500 border-red-700',
            title: '非常喜歡'
        },
        V1: {
            color: '淺紅色',
            colorClass: 'bg-red-400 border-red-600',
            title: '很喜歡'
        },
        L3: {
            color: '金黃色',
            colorClass: 'bg-yellow-500 border-yellow-600',
            title: '喜歡'
        },
        L2: {
            color: '澄色',
            colorClass: 'bg-orange-400 border-orange-600',
            title: '像喜歡'
        },
        L1: {
            color: '淺澄色',
            colorClass: 'bg-orange-200 border-orange-400',
            title: '有點喜歡'
        },
        U1: {
            color: '灰色',
            colorClass: 'bg-gray-500 border-gray-700',
            title: '有點不喜歡'
        },
        U2: {
            color: '淺綠色',
            colorClass: 'bg-green-200 border-green-400',
            title: '像不喜歡'
        },
        U3: {
            color: '綠色',
            colorClass: 'bg-green-600 border-green-800',
            title: '不喜歡'
        },
        D1: {
            color: '淡藍色',
            colorClass: 'bg-blue-200 border-blue-400',
            title: '很不喜歡'
        },
        D2: {
            color: '淺藍色',
            colorClass: 'bg-blue-400 border-blue-600',
            title: '非常不喜歡'
        },
        D3: {
            color: '藍色',
            colorClass: 'bg-blue-600 border-blue-800',
            title: '極度不喜歡'
        },
        HF: {
            color: '黑色',
            colorClass: 'bg-black border-black',
            title: '心煩意亂'
        },
        R: {
            color: '淡黃色',
            colorClass: 'bg-yellow-100 border-yellow-200',
            title: '不置可否'
        }
    }
};

const getters = {
    currentDataIndex: state => state.currentDataIndex,
    currentData: state => state.dataRowList[state.currentDataIndex],
    subMode: state => state.subMode,
    subModeOptions: state => state.subModeOptions,
    dataRowList: state => state.dataRowList,
    sentimentMap: state => state.sentimentMap
};

const actions = {
    resetDataRowList({
        state,
        commit
    }) {
        state.dataRowList.splice(0, state.dataRowList.length)
        commit('setCurrentStep', 0)
    },
    removeDataItem({ state }, idx) {
        if (idx > -1) {
            state.dataRowList.splice(idx, 1)
        }
        if (!state.dataRowList.length) {
            state.currentStep = 0
        }
        return idx
    }
};

const mutations = {
    pushDataItem(state, payload) {
        console.log(state)
        console.log(payload)
        state.dataRowList.push(payload)
        state.currentStep = 1
    },
    setDataRowList(state, payload) {
        state.dataRowList = payload
    },
    setSubMode(state, payload) {
        console.log(state)
        console.log(payload)
        state.subMode = payload
    },
    setCurrentDataIndex(state, payload) {
        state.currentDataIndex = payload
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};