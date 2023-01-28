<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { EChartsOption } from 'echarts'
import useEchats from '../hooks/useEcharts'

interface IPropsType {
  option: EChartsOption
  width?: string
  height?: string
}
const porps = withDefaults(defineProps<IPropsType>(), {
  width: '100%',
  height: '360px'
})

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOption } = useEchats(echartDivRef.value!)

  watchEffect(() => {
    setOption(porps.option)
  })
})
</script>

<style scoped lang="less"></style>
