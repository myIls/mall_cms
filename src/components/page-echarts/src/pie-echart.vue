<template>
  <div class="pie-echart">
    <BaseEcharts :option="option"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BaseEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'
import { IEchartsDataType } from '../types'

const props = defineProps<{
  pieData: IEchartsDataType[]
}>()

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'center'
  },
  series: [
    {
      name: '商品数量',
      type: 'pie',
      radius: '50%',
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
</script>

<style scoped></style>
