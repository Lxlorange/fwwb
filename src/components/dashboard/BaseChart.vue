<template>
  <div ref="chartRef" class="base-chart" :style="{ height }"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = withDefaults(
  defineProps<{
    options: Record<string, unknown>
    height?: string
  }>(),
  {
    height: '100%'
  }
)

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const renderChart = () => {
  if (!chartRef.value) {
    return
  }

  if (!chart) {
    chart = echarts.init(chartRef.value)
  }

  chart.setOption(props.options, true)
}

const resizeChart = () => {
  chart?.resize()
}

watch(
  () => props.options,
  () => {
    renderChart()
  },
  {
    deep: true
  }
)

onMounted(() => {
  renderChart()
  window.addEventListener('resize', resizeChart)

  if (chartRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => resizeChart())
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  resizeObserver?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<style lang="scss" scoped>
.base-chart {
  width: 100%;
  min-height: 8rem;
}
</style>
