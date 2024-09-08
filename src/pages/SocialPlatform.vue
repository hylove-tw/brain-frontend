<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue'
import FIleHandler from '../utils/fileHandler'

const store = useStore()
const title = ref('Social Platform')
const subTitle = ref('社交平台')
const message = ref('請輸入配對雙方的腦波資料')
const currentData = ref(null)
const fileHandler = new FIleHandler()
const scopeNameList = ref([
    { "verbose_name": '心靈精神', "key": "spiritual_mentality" },
    { "verbose_name": '博學技能', "key": "scholarly_skills" },
    { "verbose_name": '人脈關係', "key": "social_connections" },
    { "verbose_name": '物質享受', "key": "material_enjoyment" }
])
const fieldNameMap = ref({
    'p': '質能指數',
    'r': '耗損指數',
    'spiritual_mentality': '心靈精神',
    'scholarly_skills': '博學技能',
    'social_connections': '人脈關係',
    'material_enjoyment': '物質享受',
    'first_test': '會談前',
    'second_test': '會談後',
    'first_person': '甲方',
    'second_person': '乙方',
})
const useMockResponse = false
const sampleResponse = {
    "first_test": {
        "p1": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之分擔付出相當",
            "consensus_probability": 57.26,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r1": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p2": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之表現成就相當",
            "consensus_probability": 59.19,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r2": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p3": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之表現能量相當",
            "consensus_probability": 27.33,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r3": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p4": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之分擔付出相當",
            "consensus_probability": 22.36,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r4": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "sentiment_avg": {
            "first_person": {
                "avg_tw": "正常狀態,平常心情",
                "avg_en": "normal state normal mood"
            },
            "second_person": {
                "avg_tw": "正常狀態,平常心情",
                "avg_en": "normal state normal mood"
            },
            "first_person_avg": 0.259,
            "second_person_avg": 0.259
        },
        "tes_score": {
            "first_person": 79.29,
            "second_person": 79.29
        }
    },
    "second_test": {
        "p1": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之分擔付出相當",
            "consensus_probability": 57.26,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r1": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p2": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之表現成就相當",
            "consensus_probability": 59.19,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r2": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p3": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之表現能量相當",
            "consensus_probability": 27.33,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r3": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "p4": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "comment_user_energy": "本項質能雙方之分擔付出相當",
            "consensus_probability": 22.36,
            "comment_consensus_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r4": {
            "first_user_energy": 0.5,
            "second_user_energy": 0.5,
            "square_root": 0.71,
            "aupn": 0.71,
            "bupn": 0.71
        },
        "sentiment_avg": {
            "first_person": {
                "avg_tw": "正常狀態,平常心情",
                "avg_en": "normal state normal mood"
            },
            "second_person": {
                "avg_tw": "正常狀態,平常心情",
                "avg_en": "normal state normal mood"
            },
            "first_person_avg": 0.259,
            "second_person_avg": 0.259
        },
        "tes_score": {
            "first_person": 79.29,
            "second_person": 79.29
        },
        "resonance_score": {
            "spiritual_mentality": null,
            "scholarly_skills": null,
            "social_connections": null,
            "material_enjoyment": null
        },
        "resonance_percentage": {
            "natural_science": null,
            "innovative_art": null,
            "logical_judgment": null,
            "memory_calculation": null,
            "lively_and_gregarious": null,
            "social_pr": null,
            "perseverance": null,
            "witty_response": null
        }
    },
    "at1": {
        "comment": "會談前雙方認真態度皆正常",
        "comment_en": "Before the talks, the two sides seriously attitude were normal"
    },
    "at2": {
        "comment": "會談中雙方認真態度皆正常",
        "comment_en": "The serious attitude of both sides in the talks is normal"
    }
}

watch(currentData, (newVal, oldVal) => {
    if (newVal) {
    }
})

onMounted(() => {
    if (currentData.value) {
    }
})

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
};

const parseBrainData = (data) => {
    const dataLength = data['attention'].value.length;
    const placeholder = Array(dataLength).fill(100);
    return {
        "Good Signal Quality(0-100)": placeholder,
        "Attention": data['attention'].value,
        "Meditation": data['meditation'].value,
        "Delta": data['delta'].value,
        "Theta": data['theta'].value,
        "Low Alpha": data['lowAlpha'].value,
        "High Alpha": data['highAlpha'].value,
        "Low Beta": data['lowBeta'].value,
        "High Beta": data['highBeta'].value,
        "Low Gamma": data['lowGamma'].value,
        "High Gamma": data['highGamma'].value
    }
};

const handleFiles = async () => {
    console.log('useMockResponse:' + !!useMockResponse);
    console.log('sampleResponse:' + !!sampleResponse);
    if (useMockResponse && sampleResponse) {
        renderReport(sampleResponse);
        return;
    }
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const filesData = {};
    const promises = [];

    for (const fileInput of fileInputs) {
        const file = fileInput.files[0];
        if (file) {
            const promise = readFile(file).then(data => {
                filesData[fileInput.name] = fileHandler.parseCsvData(data);
            });
            promises.push(promise);
        }
    }

    // Wait for all files to be read and parsed
    await Promise.all(promises);
    const payload = preparePayload(filesData);
    console.log(payload);

    // post to server, path is /social/amplitude
    axios.post('/social/amplitude', payload)
        .then((response) => {
            console.log(response.data);
            renderReport(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

};

const renderReport = (data) => {
    console.log(data);
    currentData.value = data;
};

const preparePayload = (filesData) => {
    const payload = {
        "first_person": {
            "first_test": {
                "beforeBrainData": parseBrainData(filesData['user1-pre-before-data']),
                "afterBrainData": parseBrainData(filesData['user1-pre-after-data'])
            },
            "second_test": {
                "beforeBrainData": parseBrainData(filesData['user1-post-before-data']),
                "afterBrainData": parseBrainData(filesData['user1-post-after-data'])
            }
        },
        "second_person": {
            "first_test": {
                "beforeBrainData": parseBrainData(filesData['user2-pre-before-data']),
                "afterBrainData": parseBrainData(filesData['user2-pre-after-data'])
            },
            "second_test": {
                "beforeBrainData": parseBrainData(filesData['user2-post-before-data']),
                "afterBrainData": parseBrainData(filesData['user2-post-after-data'])
            }
        }
    };
    return payload;
};

</script>
<template>
    <div class="p-4 w-full max-w-7xl pb-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 space-y-4 lg:gap-6 lg:space-y-0">
            <div class="flex flex-col w-full">
                <div class="card p-2 bg-base-100 shadow-xl">
                    <Sidebar />
                    <form class="flex flex-col space-y-2" @submit.prevent="">
                        <div v-if="!(useMockResponse && sampleResponse)">
                            <div class="space-y-2">
                                <h3 class="text-lg font-bold">配對後數據</h3>
                                <div class="p-2 border rounded-md">
                                    <h4 class="font-xl font-bold">第一人</h4>
                                    <label for="user1-pre-before-data">前測資料</label>
                                    <input type="file" required name="user1-pre-before-data" accept=".csv" />
                                    <label for="user1-pre-after-data">後側資料</label>
                                    <input type="file" required name="user1-pre-after-data" accept=".csv" />
                                </div>
                                <div class="p-2 border rounded-md">
                                    <h4 class="font-xl font-bold">第二人</h4>
                                    <label for="user1-pre-before-data">前測資料</label>
                                    <input type="file" required name="user2-pre-before-data" accept=".csv" />
                                    <label for="user2-pre-after-data">後側資料</label>
                                    <input type="file" required name="user2-pre-after-data" accept=".csv" />
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div class="space-y-2">
                                <h3 class="text-lg font-bold">配對後數據</h3>
                                <div class="p-2 border rounded-md">
                                    <h4 class="font-xl font-bold">第一人</h4>
                                    <label for="user1-post-before-data">前測資料</label>
                                    <input type="file" required name="user1-post-before-data" accept=".csv" />
                                    <label for="user1-post-after-data">後側資料</label>
                                    <input type="file" required name="user1-post-after-data" accept=".csv" />
                                </div>
                                <div class="p-2 border rounded-md">
                                    <h4 class="font-xl font-bold">第二人</h4>
                                    <label for="user2-post-before-data">前測資料</label>
                                    <input type="file" required name="user2-post-before-data" accept=".csv" />
                                    <label for="user2-post-after-data">後側資料</label>
                                    <input type="file" required name="user2-post-after-data" accept=".csv" />
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary" type="submit" @click="handleFiles">Upload</button>
                    </form>
                </div>
            </div>
            <div class="md:col-span-3" ref="targetElement">

                <div class="w-full">
                    <div class="flex flex-col gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <div class="flex w-full justify-start items-center">
                                    <header class="flex flex-col justify-start">
                                        <h2 class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
                                        <h3 class="text-md">{{ subTitle }}</h3>
                                    </header>
                                </div>
                                <div class="text-sm font-semibold">{{ message }}</div>
                                <div v-if="currentData">
                                    <!-- A report -->
                                    <div class="space-y-4 py-2">
                                        <div class="space-x-2 justify-between items-end">
                                            <div class="text-2xl">A. 情緒評語報告</div>
                                            <table class="table w-full">
                                                <thead>
                                                    <tr>
                                                        <th>天賦潛能（第一次）</th>
                                                        <th>會談前之情緒評語</th>
                                                        <th>天賦潛能（第二次）</th>
                                                        <th>會談後之情緒評語</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{{ fieldNameMap['first_person'] }}（A）</td>
                                                        <td>
                                                            <div>
                                                                {{
                        currentData.first_test.sentiment_avg.first_person_avg
                    }}
                                                            </div>
                                                            <div>
                                                                {{
                            currentData.first_test.sentiment_avg.first_person.avg_tw
                        }}
                                                            </div>
                                                        </td>
                                                        <td>{{ fieldNameMap['first_person'] }}（A）</td>
                                                        <td>
                                                            <div>
                                                                {{
                        currentData.second_test.sentiment_avg.first_person_avg
                    }}
                                                            </div>
                                                            <div>
                                                                {{
                            currentData.second_test.sentiment_avg.first_person.avg_tw
                        }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ fieldNameMap['second_person'] }}（B）</td>
                                                        <td>
                                                            <div>
                                                                {{
                        currentData.first_test.sentiment_avg.second_person_avg
                    }}
                                                            </div>
                                                            <div>
                                                                {{
                            currentData.first_test.sentiment_avg.second_person.avg_tw
                        }}
                                                            </div>
                                                        </td>
                                                        <td>{{ fieldNameMap['second_person'] }}（B）</td>
                                                        <td>
                                                            <div>
                                                                {{
                        currentData.first_test.sentiment_avg.second_person_avg
                    }}
                                                            </div>
                                                            <div>
                                                                {{
                            currentData.first_test.sentiment_avg.second_person.avg_tw
                        }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                    <!-- B report -->
                                    <div class="space-y-4 py-2">
                                        <div class="space-x-2 justify-between items-end">
                                            <div class="text-2xl">B. 雙方共振百分比測試報告: (第二次「天賦潛能」測試)</div>
                                            <table class="table w-full">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>創新藝術</span>
                                                                <span>Innovative art</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.innovative_art
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>生命科學</span>
                                                                <span>Innovative art</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.natural_science
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>活潑合群</span>
                                                                <span>Lively and gregarious</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.lively_and_gregarious
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>邏輯判斷</span>
                                                                <span>Logical judgment</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.logical_judgment
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                        <td class="space-y-2">
                                                            <div class="flex flex-col">
                                                                <span>總能量TE(Total Energy)</span>
                                                                <span>{{ fieldNameMap.first_person }}={{
                        currentData.second_test.tes_score.first_person
                    }}</span>
                                                                <span>{{ fieldNameMap.second_person }}={{
                        currentData.second_test.tes_score.second_person
                    }}</span>
                                                            </div>
                                                            <div class="flex flex-col">
                                                                <span>情緒平均分數</span>
                                                                <span>{{ fieldNameMap.first_person }}={{
                        currentData.second_test.sentiment_avg.first_person_avg
                    }}</span>
                                                                <span>{{ fieldNameMap.second_person }}={{
                        currentData.second_test.sentiment_avg.second_person_avg
                    }}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>社交公關</span>
                                                                <span>Social PR</span>
                                                                <span>
                                                                    共振百分比={{
                            currentData.second_test.resonance_percentage.social_pr
                            * 100
                        }}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>記憶計算</span>
                                                                <span>Memory calculation</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.memory_calculation
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>機智反應</span>
                                                                <span>Witty response</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.witty_response
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="flex flex-col">
                                                                <span>堅毅忍耐</span>
                                                                <span>Perseverance</span>
                                                                <span>
                                                                    共振百分比={{
                            Math.round(currentData.second_test.resonance_percentage.perseverance
                                * 100)
                        }}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                    <!-- C report -->
                                    <div class="space-y-4 py-2">
                                        <div class="space-x-2 justify-between items-end">
                                            <div class="text-2xl">C. 四項志趣觀點之質能報告</div>
                                            <table class="table w-full">
                                                <thead>
                                                    <tr>
                                                        <th>項目</th>
                                                        <th v-for="sName in scopeNameList">{{ sName.verbose_name }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- 質能指數 -->
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.first_person }}{{
                        fieldNameMap.first_test }}{{ fieldNameMap.p }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.first_test["p" + (index + 1)].first_user_energy
                    }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.first_person }}{{
                        fieldNameMap.second_test }}{{ fieldNameMap.p }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.second_test["p" + (index + 1)].first_user_energy
                    }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.second_person }}{{
                        fieldNameMap.first_test }}{{ fieldNameMap.p }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.first_test["p" + (index + 1)].second_user_energy
                    }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.second_person }}{{
                        fieldNameMap.second_test }}{{ fieldNameMap.p }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.second_test["p" + (index +
                            1)].second_user_energy
                    }}
                                                        </td>
                                                    </tr>
                                                    <!-- r 耗損指數 -->
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.first_person }}{{
                        fieldNameMap.first_test }}{{ fieldNameMap.r }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.first_test["r" + (index +
                            1)].first_user_energy
                    }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.first_person }}{{
                        fieldNameMap.second_test }}{{ fieldNameMap.r }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                        currentData.second_test["r" + (index +
                            1)].first_user_energy
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.second_person }}{{
                                                            fieldNameMap.first_test }}{{ fieldNameMap.r }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                                                            currentData.first_test["r" + (index +
                                                            1)].second_user_energy
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {{ fieldNameMap.second_person }}{{
                                                            fieldNameMap.second_test }}{{ fieldNameMap.r }}
                                                        </td>
                                                        <td v-for="(sItem, index) in scopeNameList">
                                                            {{
                                                            currentData.second_test["r" + (index +
                                                            1)].second_user_energy
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>雙方會談質能共振指數比</td>
                                                        <td v-for="(sItem, index) in scopeNameList">{{
                                                            currentData.second_test["p" + (index +
                                                            1)].resonance_score }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div class="space-x-2 justify-between items-end w-full overflow-x-auto">
                                            <table class="table-auto border-collapse border text-sm">
                                                <thead>
                                                    <tr>
                                                        <th class="border">雙方志趣觀點</th>
                                                        <th class="border" v-for="sName in scopeNameList">{{
                                                            sName.verbose_name }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="border">
                                                            質能付出貢獻指數
                                                        </td>
                                                        <td class="border" v-for="(sName, index) in scopeNameList">
                                                            {{
                                                            currentData.second_test["p" + (index+1)].comment_user_energy
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border">
                                                            問題處理
                                                        </td>
                                                        <td class="border" v-for="(sName, index) in scopeNameList">
                                                            {{
                                                            currentData.second_test["p" +
                                                            (index+1)].comment_consensus_probability
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border">
                                                            「非理性」「情緒性」意見衝突之機率
                                                        </td>
                                                        <td class="border" v-for="(sName, index) in scopeNameList">
                                                            <p>{{fieldNameMap.first_person}}約: {{
                                                                currentData.second_test["r" +
                                                                (index+1)].aupn
                                                                }}</p>
                                                            <p>{{fieldNameMap.second_person}}約: {{
                                                                currentData.second_test["r" +
                                                                (index+1)].bupn
                                                                }}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="border">
                                                            雙方質能共振指數比
                                                        </td>
                                                        <td class="border" v-for="(sName, index) in scopeNameList">
                                                            {{
                                                            currentData.second_test["p" +
                                                            (index+1)].comment_resonance_score
                                                            }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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

<style scoped></style>