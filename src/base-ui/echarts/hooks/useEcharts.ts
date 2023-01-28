import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData as any)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    updateSize
  }
}
