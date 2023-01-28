<template>
  <div class="map-echart">
    <BaseEcharts :option="(option as EChartsOption)"></BaseEcharts>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BaseEcharts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'
import { convertData } from '../utils/convert-data'
import { IEchartsDataType } from '../types'

const props = defineProps<{ mapData: IEchartsDataType[] }>()

const option = computed(() => ({
  backgroundColor: '#eee',
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      return params.name + ' : ' + params.value[2]
    }
  },
  legend: {
    orient: 'vertical',
    right: 20,
    top: 10,
    data: ['销量'],
    textStyle: {
      color: '#333'
    }
  },
  visualMap: {
    min: 0,
    max: 50000,
    left: 20,
    bottom: 20,
    calculable: true,
    text: ['高', '低'],
    inRange: {
      color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
    },
    textStyle: {
      color: '#333'
    }
  },
  geo: {
    map: 'china',
    roam: true,
    itemStyle: {
      areaColor: 'rgb(19, 91, 153)',
      borderColor: 'rgb(9, 54, 95)'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgb(10, 105, 187)'
      },
      label: {
        show: false
      }
    }
  },
  series: [
    {
      name: '销量',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(props.mapData),
      symbolSize: 12,
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    },
    {
      type: 'map',
      map: 'china',
      geoIndex: 0,
      aspectScale: 0.75,
      tooltip: {
        show: false
      }
    }
  ]
}))
</script>

<style scoped></style>
