<template>
  <div class="rose-echart">
    <BaseEcharts :option="option"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BaseEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'
import { IEchartsDataType } from '../types'

const props = defineProps<{
  roseData: IEchartsDataType[]
}>()

const option = computed<EChartsOption>(() => ({
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: 'bottom'
  },
  series: [
    {
      name: '商品数量',
      type: 'pie',
      radius: [40, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: props.roseData
    }
  ]
}))
</script>

<style scoped></style>
