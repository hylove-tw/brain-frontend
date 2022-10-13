<template>
  <div>
    <Chart :options="options" ref="lineCharts"
           v-if="factorData"></Chart>
    <div class="overflow-scroll">
      <table class="table w-full">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">平均</th>
          <th scope="col">震幅</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in props.factorData">
          <th scope="row">{{ item.name }}</th>
          <td>{{ item.avg }}</td>
          <td>{{ item.amplitude }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Chart } from 'highcharts-vue'
import { computed, onMounted } from "vue";

const props = defineProps({
  factorName: String,
  factorData: Object
})

const options = computed(() => {
  return {
    chart: {
      type: 'line',
      zoomType: 'x'
    },
    title: {
      text: props.factorName
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    xAxis: {
      type: 'int',
      title: {
        text: '時間(T)'
      }
    },
    yAxis: {
      title: {
        text: '數值'
      }
    },
    series: props.factorData.map((item) => {
      return {
        name: item.name,
        data: item.series
      }
    })
  }
})
</script>

<style scoped>

</style>
