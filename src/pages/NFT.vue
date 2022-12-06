<template>
  <div>
    <div class="px-4 flex w-full justify-between items-center">
      <header class="py-4 md:py-6 flex flex-col justify-start">
        <h2 class="text-2xl md:text-4xl font-semibold">{{ title }}</h2>
        <h3 class="text-md">{{ subTitle }}</h3>
      </header>
      <div>
        <label for="nft-type">NFT類型</label>
        <select id="nft-type" class="select w-full max-w-xs" v-model="nftType">
          <option v-for="(option, idx) in nftTypeChoices" :value="option.name">{{ option.text }}</option>
        </select>
      </div>
    </div>
    <div class="hero bg-base-200">
      <div class="hero-content w-full text-center flex flex-col">
        <div class="w-full" v-if="currentData">
          <P5Demo :brain-data="currentData" v-if="nftType === 'basic'" />
          <IceCream :brain-data="currentData" v-if="nftType === 'iceCream'" />
        </div>
        <div class="max-w-md" v-else>
          <h1 class="text-5xl font-bold">尚無紀錄</h1>
          <p class="py-6">上傳您的腦波創作屬於你獨一無二的NFT</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import P5Demo from '../components/nft/P5Demo.vue'
import IceCream from '../components/nft/IceCream.vue'
import { useStore } from 'vuex'

const store = useStore()

const title = ref('NFT')
const subTitle = ref('腦波NFT')
const nftType = ref('basic')

const nftTypeChoices = [
  { name: "basic", text: "目標圓心" },
  { name: "iceCream", text: "冰淇淋水果" }
]

const currentData = computed(() => store.getters.currentData)

</script>

<style scoped>

</style>