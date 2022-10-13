<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')
const msg = ref(null)

const user = computed(() => store.stateUser)
onBeforeMount(() => {
  if (store.getters.isAuthenticated) {
    router.push({ name: 'Welcome' })
  }
})
const login = () => {
  console.log(username.value)
  store.dispatch('logIn', { username: username.value, password: password.value })
  if (store.getters.isAuthenticated) {
    router.push({ name: 'Welcome' })
  } else {
    msg.value = '帳號或密碼錯誤'
  }
}

</script>

<template>
  <div class="hero bg-base-200">
    <div class="hero-content pt-6 lg:pt-12 flex-col">
      <div class="text-center lg:text-left lg:px-6">
        <h1 class="text-5xl font-bold">登入</h1>
        <p class="py-6"></p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent>
            <div class="form-control">
              <label class="label">
                <span class="label-text">帳號</span>
              </label>
              <input type="text" placeholder="帳號" class="input input-bordered" v-model="username" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">密碼</span>
              </label>
              <input type="password" placeholder="密碼" class="input input-bordered" v-model="password" />
              <!--            <label class="label">-->
              <!--              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>-->
              <!--            </label>-->
            </div>
            <div v-if="msg"><span>{{ msg }}</span></div>
            <div class="form-control mt-6">
              <input type="button" class="btn btn-primary" :disabled="!(username && password)" @click="login"
                value="登入" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>