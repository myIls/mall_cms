<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <myCard title="每种商品的数量(饼图)">
          <pieEchart :pie-data="goodsCategoryCount"></pieEchart>
        </myCard>
      </el-col>

      <el-col :span="10">
        <myCard title="不同城市的销量">
          <mapEchart :map-data="goodsAddressSale"></mapEchart>
        </myCard>
      </el-col>

      <el-col :span="7">
        <myCard title="每种商品的数量(玫瑰图)">
          <roseEchart :rose-data="goodsCategoryCount"></roseEchart>
        </myCard>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="margin-top">
      <el-col :span="12">
        <myCard title="每种商品的销量">
          <lineEchart :="goodsCategorySale"></lineEchart>
        </myCard>
      </el-col>

      <el-col :span="12">
        <myCard title="每种商品的收藏">
          <barEchart :="goodsCategoryFavor"></barEchart>
        </myCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import myCard from '@/base-ui/card'
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const goodsCategoryCount = computed(() => {
  return store.state.dashboard.goodsCategoryCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const goodsCategorySale = computed(() => {
  const xLables: string[] = []
  const values: any[] = []
  const Sales = store.state.dashboard.goodsCategorySale

  for (const item of Sales) {
    xLables.push(item.name)
    values.push(item.goodsCount)
  }

  return { xLables, values }
})

const goodsCategoryFavor = computed(() => {
  const dataAxis: string[] = []
  const values: any[] = []
  const Favor = store.state.dashboard.goodsCategoryFavor

  for (const item of Favor) {
    dataAxis.push(item.name)
    values.push(item.goodsFavor)
  }

  return { dataAxis, values }
})

const goodsAddressSale = computed(() => {
  return store.state.dashboard.goodsAddressSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.margin-top {
  margin-top: 20px;
}
</style>
