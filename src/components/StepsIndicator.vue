<template>
  <div class="flex items-stretch gap-2">
    <ul class="w-full steps">
      <li v-for="step in stepsCountWithSuccessPage"
          :key="step"
          class="step"
          :class="{'step-primary ': step - 1 <= currentStep || submitted}"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StepsIndicator',
  props: {
    stepCount: Number,
    currentStep: Number,
    submitted: Boolean
  },
  computed: {
    stepsCountWithSuccessPage () {
      return this.stepCount + 1
    }
  }
}
</script>

<style scoped>

</style>
