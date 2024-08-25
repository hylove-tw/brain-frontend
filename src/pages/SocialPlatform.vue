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

const sampleResponse = {
    "first_test": {
        "p1": {
            "first_user_energy": 0.5073786114948637,
            "second_user_energy": 0.49262138850513637,
            "comment_user_energy": "本項質能甲方之分擔付出略高於乙方",
            "resonance_probability": 55.587783397073856,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r1": {
            "first_user_energy": 0.16194891726750227,
            "second_user_energy": 0.8380510827324977,
            "square_root": 0.8535555453942222,
            "aupn": 0.18973447966143167,
            "bupn": 0.9818354379566903
        },
        "p2": {
            "first_user_energy": 0.5050129633160714,
            "second_user_energy": 0.4949870366839286,
            "comment_user_energy": "本項質能甲方之成就表現略高於乙方",
            "resonance_probability": 58.01449068656727,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r2": {
            "first_user_energy": 0.21342998028502483,
            "second_user_energy": 0.7865700197149752,
            "square_root": 0.8150121179460356,
            "aupn": 0.26187338272086486,
            "bupn": 0.9651022388443264
        },
        "p3": {
            "first_user_energy": 0.44197326742098364,
            "second_user_energy": 0.5580267325790164,
            "comment_user_energy": "本項質能乙方之表現能量遠高於甲方",
            "resonance_probability": 34.50419796984709,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r3": {
            "first_user_energy": 0.2584835728920942,
            "second_user_energy": 0.7415164271079058,
            "square_root": 0.7852772562133304,
            "aupn": 0.3291621791499764,
            "bupn": 0.94427340310804
        },
        "p4": {
            "first_user_energy": 0.4499615718267746,
            "second_user_energy": 0.5500384281732253,
            "comment_user_energy": "本項質能乙方之付出貢獻遠高於甲方",
            "resonance_probability": 27.321213963603444,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r4": {
            "first_user_energy": 0.22526659583339537,
            "second_user_energy": 0.7747334041666047,
            "square_root": 0.8068189925441406,
            "aupn": 0.27920338751950136,
            "bupn": 0.9602319867603012
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
            "second_person_avg": -0.093
        },
        "TesScore": {
            "first_preson": 79.29,
            "second_person": 80.0
        }
    },
    "second_test": {
        "p1": {
            "first_user_energy": 0.5417276072205031,
            "second_user_energy": 0.45827239277949694,
            "comment_user_energy": "本項質能甲方之分擔付出略高於乙方",
            "resonance_probability": 63.79956800794188,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r1": {
            "first_user_energy": 0.6897600637105232,
            "second_user_energy": 0.31023993628947677,
            "square_root": 0.7563185595758204,
            "aupn": 0.9119967439346902,
            "bupn": 0.4101974391101471
        },
        "p2": {
            "first_user_energy": 0.5696443658933703,
            "second_user_energy": 0.4303556341066298,
            "comment_user_energy": "本項質能甲方之成就表現遠高於乙方",
            "resonance_probability": 75.26691160323905,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r2": {
            "first_user_energy": 0.7498571951459002,
            "second_user_energy": 0.2501428048540998,
            "square_root": 0.7904791179609699,
            "aupn": 0.9486110108514272,
            "bupn": 0.3164445450492604
        },
        "p3": {
            "first_user_energy": 0.6457820752655901,
            "second_user_energy": 0.3542179247344099,
            "comment_user_energy": "本項質能甲方之表現能量遠高於乙方",
            "resonance_probability": 79.4230190305254,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有共識"
        },
        "r3": {
            "first_user_energy": 0.7680691214118897,
            "second_user_energy": 0.2319308785881104,
            "square_root": 0.8023229447729168,
            "aupn": 0.957306688554542,
            "bupn": 0.28907421892783375
        },
        "p4": {
            "first_user_energy": 0.48055002642415773,
            "second_user_energy": 0.5194499735758423,
            "comment_user_energy": "本項質能乙方之付出貢獻略高於甲方",
            "resonance_probability": 30.8967270727273,
            "comment_resonance_probability": "甲乙雙方對此質能處理態度有爭議"
        },
        "r4": {
            "first_user_energy": 0.7127135244470342,
            "second_user_energy": 0.2872864755529659,
            "square_root": 0.768436130700111,
            "aupn": 0.9274857024196549,
            "bupn": 0.37385862542827514
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
            "first_person_avg": 0.833,
            "second_person_avg": -0.093
        },
        "TesScore": {
            "first_preson": 73.56,
            "second_person": 80.0
        }
    },
    "at1": {
        "comment": "會談前雙方認真態度皆正常",
        "comment_en": "Before the talks, the two sides seriously attitude were normal"
    },
    "at2": {
        "comment": "會談中甲方積極認真",
        "comment_en": "Party A is positive and serious during the talks"
    }
}

watch(currentData, (newVal, oldVal) => {
    if (newVal) {
    }
})

onMounted(() => {
    if (currentData.value) {
        // fetchMusicXML(currentData.value)
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
    if (sampleResponse) {
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
                        <div v-if="!sampleResponse">
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
                                <div v-show="currentData">
                                    <div class="space-y-4">
                                        <div class="flex flex-col space-y-2 space-x-2 justify-between">
                                            <div class="flex space-x-2 justify-between items-end">
                                                <!-- report -->
                                                <div class="flex flex-col space-y-2">
                                                    <div class="flex flex-col space-y-2">
                                                        <h3 class="text-lg font-bold">第一次測試</h3>
                                                        <div class="flex flex-col space-y-2">
                                                            <div class="flex flex-col space-y-2">
                                                                <h4 class="font-xl font-bold">第一項質能</h4>
                                                                <div class="flex flex-col space-y-2">
                                                                    <div class="flex flex-col space-y-2">
                                                                        <h5 class="font-lg font-bold">甲方</h5>
                                                                        <div class="flex flex-col space-y-2">
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">能量</h6>
                                                                                <p>{{
                        currentData?.first_test.p1.first_user_energy
                    }}</p>
                                                                            </div>
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">共振機率</h6>
                                                                                <p>{{
                            currentData?.first_test.p1.resonance_probability
                        }}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex flex-col space-y-2">
                                                                        <h5 class="font-lg font-bold">乙方</h5>
                                                                        <div class="flex flex-col space-y-2">
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">能量</h6>
                                                                                <p>{{
                            currentData?.first_test.p1.second_user_energy
                        }}</p>
                                                                            </div>
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">共振機率</h6>
                                                                                <p>{{
                            currentData?.first_test.p1.resonance_probability
                        }}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-col space-y-2">
                                                                <h4 class="font-xl font-bold">第二項質能</h4>
                                                                <div class="flex flex-col space-y-2">
                                                                    <div class="flex flex-col space-y-2">
                                                                        <h5 class="font-lg font-bold">甲方</h5>
                                                                        <div class="flex flex-col space-y-2">
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">能量</h6>
                                                                                <p>{{
                                                                                    currentData?.first_test.p2.first_user_energy
                                                                                    }}</p>
                                                                            </div>
                                                                            <div class="flex flex-col space-y-2">
                                                                                <h6 class="font-md font-bold">共振機率</h6>
                                                                                <p>{{
                                                                                    currentData?.first_test.p2.resonance_probability
                                                                                    }}</p>
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
                                        <div class="divider"></div>
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