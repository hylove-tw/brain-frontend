<template>
  <label for="formModal" class="btn btn-sm btn-primary modal-button">新增紀錄</label>
  <div class="block">
    <input type="checkbox" id="formModal" class="modal-toggle" v-model="showModal">
    <div class="modal">
      <div class="modal-box">
        <div class="modal-action my-2">
          <label for="formModal" class="btn btn-sm btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
        <div id="multi-step-form" class="card bg-base-100 w-full max-w-xl flex justify-center text-center">
          <div class="card-body p-5 md:p-10">
            <div v-if="!isSubmitted" class="card-title">輸入基本資料</div>
            <form class="" @submit.prevent="">
              <h6 class="my-5">
                <StepsIndicator :step-count="totalSteps" :currentStep="currentStep" :submitted="isSubmitted" />
              </h6>
              <div v-for="(fieldKeys, step) in steps" :key="step" class=" w-auto flex justify-center">
                <div v-if="currentStep === step" class="">
                  <!--Form Field-->
                  <div v-for="field in fieldKeys" :key="field" class="relative">
                    <div class="py-2 text-center">
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">{{ fields[field].label }}</span>
                        </label>
                        <div class="text-xs text-red-600" v-if="!fields[field].fieldValue && isCheckedForm">未輸入或格式錯誤
                        </div>
                        <select v-if="fields[field].type === 'select'" v-model="fields[field].fieldValue"
                          class="select select-bordered">
                          <option v-for="(option, idx) in fields[field].options" :key="idx" :value="option">{{ idx }}.
                            {{ option }}
                          </option>
                        </select>
                        <input v-else-if="fields[field].type === 'file'" ref="fileInput" class="input input-bordered"
                          type="file" :required="fields[field].required" @change="fields[field].onChangeFunc" />
                        <input v-else class="input input-bordered" :type="fields[field].type"
                          v-model="fields[field].fieldValue" :required="fields[field].required" />
                        <sub v-if="errors">{{ errors[field] }}</sub>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="flex flex-row-reverse gap-2 justify-center mt-5">
                <label class="btn btn-success" @click="submit" v-if="isLastStep">
                  Submit
                </label>
                <button class="btn btn-primary" @click="nextStep" v-if="!isLastStep">
                  Next
                </button>
                <button class="btn btn-secondary" @click.prevent="previousStep" v-if="!isFirstStep">
                  Previous
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StepsIndicator from './StepsIndicator.vue'
import BrainDataRow from '../../objects/brainDataRow'
import { useStore } from 'vuex'
import FIleHandler from '../../utils/fileHandler'
import { ref, computed, onMounted, defineProps } from 'vue'

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
const fileHandler = new FIleHandler()

const steps = ref([
  ['subMode'],
  ['name', 'gender', 'age'],
  ['fileInput', 'afterDataInput']
])
const fields = computed(() => {
  return getNewFields()
})

const brainDataRow = ref(null)
const submitted = ref(false)
const isCheckedForm = ref(false)
const skipValidate = ref(true)
const showModal = ref(false)
const errors = ref({})
const file = ref()

const dataRowList = computed(() => store.getters.dataRowList)
const isSubmitted = computed(() => store.getters.isSubmitted)
const currentStep = computed(() => store.getters.currentStep)
const subMode = computed(() => store.getters.subMode)
const totalSteps = computed(() => steps.value.length)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)
const fieldErrors = computed(() => errors.value)
const emptyFields = {
  subMode: {
    label: '模式',
    fieldValue: '五感測試',
    type: 'select',
    options: props.subModeOptions
  },
  name: {
    label: '姓名',
    fieldValue: '',
    type: 'text',
    required: false
  },
  email: {
    label: '電子信箱',
    fieldValue: 'example@hylove.com.tw',
    type: 'text',
    required: false
  },
  gender: {
    label: '性別',
    fieldValue: '男性',
    type: 'select',
    options: {
      1: '男性',
      2: '女性',
      3: '其他'
    },
    required: false
  },
  age: {
    label: '年齡',
    fieldValue: 18,
    type: 'number',
    required: false
  },
  fileInput: {
    label: '前測檔案',
    fieldValue: '',
    type: 'file',
    onChangeFunc: loadBeforeData,
    required: true
  },
  afterDataInput: {
    label: '後測檔案',
    fieldValue: '',
    type: 'file',
    onChangeFunc: loadAfterData,
    required: false
  }
}
onMounted(() => {
  resetSteps()
})

function getNewFields() {
  const newFields = Object.assign({}, emptyFields)
  newFields.name.fieldValue = 'User' + (dataRowList.value.length + 1)
  return newFields
}

function checkForm() {
  if (skipValidate.value) {
    return true
  }
  const fieldKeys = steps.value[currentStep.value]
  isCheckedForm.value = true
  let passed = true
  fieldKeys.forEach(field => {
    if (!fields.value[field].fieldValue) {
      passed = false
    }
  })
  return passed
}

function previousStep() {
  store.commit('setCurrentStep', currentStep.value - 1)
  isCheckedForm.value = false
}

function nextStep() {
  if (checkForm()) {
    store.commit('setCurrentStep', currentStep.value + 1)
    isCheckedForm.value = false
  }
}

function submit() {
  if (checkForm()) {
    submitted.value = true
    brainDataRow.value.name = fields.value.name.fieldValue
    brainDataRow.value.email = fields.value.email.fieldValue
    brainDataRow.value.gender = fields.value.gender.fieldValue
    brainDataRow.value.age = fields.value.age.fieldValue
    brainDataRow.value.subMode = fields.value.subMode.fieldValue
    store.commit('setSubMode', fields.value.subMode.fieldValue)
    store.commit('pushDataItem', brainDataRow.value)
    resetSteps()
    showModal.value = false
    store.commit('setCurrentDataIndex', dataRowList.value.length - 1)
  }
}

function resetSteps() {
  fields.value = Object.assign({}, emptyFields)
  submitted.value = false
  isCheckedForm.value = false
  brainDataRow.value = null
}

function loadBeforeData(event) {
  file.value = event.target.files ? event.target.files[0] : null
  fields.value.fileInput.fieldValue = file.value.name
  if (file.value) {
    if (file.value.name.endsWith('.csv')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const parsedData = fileHandler.parseCsvData(e.target.result)
        if (!brainDataRow.value) {
          brainDataRow.value = new BrainDataRow()
        }
        brainDataRow.value.setBeforeData(parsedData)
        brainDataRow.value.fileInput.before = file.value.name
      }
      reader.readAsText(file.value)
      errors.value.fileInput = null
    }
    else {
      alert('檔案格式錯誤或不支援')
      brainDataRow.value = null
      errors.value.fileInput = '檔案格式錯誤或不支援'
      file.value = null
      fields.value.fileInput.fieldValue = null
    }
  }
}

function loadAfterData(event) {
  file.value = event.target.files ? event.target.files[0] : null
  fields.value.fileInput.fieldValue = file.value.name
  if (file.value) {

    if (file.value.name.endsWith('.csv')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const parsedData = fileHandler.parseCsvData(e.target.result)
        if (!brainDataRow.value) {
          brainDataRow.value = new BrainDataRow()
        }
        brainDataRow.value.setAfterData(parsedData)
        brainDataRow.value.fileInput.after = file.value.name
      }
      reader.readAsText(file.value)
      errors.value.fileInput = null
    }
    else {
      alert('檔案格式錯誤或不支援')
      brainDataRow.value = null
      errors.value.fileInput = '檔案格式錯誤或不支援'
      file.value = null
      fields.value.fileInput.fieldValue = null
    }
  }
}
</script>

<style scoped></style>
