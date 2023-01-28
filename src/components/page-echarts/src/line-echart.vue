<template>
  <div class="line-echart">
    <BaseEcharts :option="option"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BaseEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'

const props = defineProps<{
  values: any[]
  xLables: string[]
}>()

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['商品销量']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: props.xLables
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '商品销量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: props.values
    }
  ]
}))
</script>

<style scoped></style>
