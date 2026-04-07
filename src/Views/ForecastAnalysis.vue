<template>
  <div class="side-panel-page">
    <PanelCard title="预测摘要" subtitle="保留关键预测窗口和误差指标">
      <div class="side-panel-metrics">
        <MetricCard
          v-for="item in forecastMetrics"
          :key="item.label"
          v-bind="item"
          compact
        />
      </div>
    </PanelCard>

    <PanelCard title="多要素时间序列" subtitle="温度、盐度、流速联合预测趋势">
      <BaseChart :options="forecastTrendOption" height="100%" />
    </PanelCard>

    <PanelCard title="空间分布与误差" subtitle="保留空间热力图和误差摘要">
      <div class="side-panel-scroll content-stack">
        <BaseChart :options="forecastHeatmapOption" height="8.8rem" />

        <div class="side-panel-note-list">
          <article v-for="item in forecastInsights.slice(0, 2)" :key="item" class="side-panel-note">
            <p>{{ item }}</p>
          </article>
        </div>

        <div class="side-panel-mini-table">
          <article v-for="row in forecastErrorRows" :key="row.horizon" class="side-panel-mini-row">
            <div>
              <strong class="side-panel-mini-row__title">{{ row.horizon }} 预测窗口</strong>
              <div class="side-panel-mini-row__sub">温度 {{ row.temperature }} · 盐度 {{ row.salinity }}</div>
            </div>
            <div class="side-panel-mini-row__meta">流速 {{ row.current }}<br />{{ row.status }}</div>
          </article>
        </div>
      </div>
    </PanelCard>
  </div>
</template>

<script lang="ts" setup>
import BaseChart from '@/components/dashboard/BaseChart.vue'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import PanelCard from '@/components/dashboard/PanelCard.vue'
import {
  forecastErrorRows,
  forecastInsights,
  forecastMetrics
} from '@/data/oceanDashboard'
import {
  createForecastHeatmapOption,
  createForecastTrendOption
} from '@/data/oceanCharts'

const forecastTrendOption = createForecastTrendOption()
const forecastHeatmapOption = createForecastHeatmapOption()
</script>

<style lang="scss" scoped>
.content-stack {
  display: grid;
  gap: 0.82rem;
}
</style>
