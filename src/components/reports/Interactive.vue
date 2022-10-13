<template>
  <div>
    <div>
      <div class="card my-4" v-if="brainData">
        <div class="card-body">
          <h5 class="card-title justify-center text-2xl"><b>五感互動驗證模式</b></h5>
          <h6 class="card-subtitle mb-2 text-muted text-center">
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Interactive',
  props: [
    'brainData'
  ],
  computed: {
  }
}
</script>

<style scoped>

</style>
