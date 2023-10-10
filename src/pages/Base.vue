<template>
  <div class="drawer min-h-screen">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <Navbar></Navbar>
      <!-- Page content here -->
      <div class="flex flex-col items-center h-full justify-between" v-if="isAuthenticated">

        <router-view></router-view>
        <Footer></Footer>
      </div>
      <div class="flex flex-col items-center h-full justify-between" id="anonymous" v-else>
        <router-view></router-view>
        <Footer></Footer>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <!-- <li v-for="(item, idx) in navItems" :key="idx">
          <a @click="routeTo(item.routeData)">{{ item.name }}</a>
        </li> -->
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
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'

const store = useStore()
const user = computed(() => store.getters.stateUser)
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const router = useRouter()

function routeTo(routeData) {
  router.push(routeData)
}

function logout() {
  user.value = null
  store.dispatch('logOut')
  router.push({ name: 'Login' })
}



onBeforeMount(() => {
})
</script>

<style scoped></style>
