<template>
  <div class="side-panel-page">
    <PanelCard title="涡旋识别统计" subtitle="保留核心识别结果和识别质量指标">
      <div class="side-panel-metrics">
        <MetricCard
          v-for="item in eddyMetrics"
          :key="item.label"
          v-bind="item"
          compact
        />
      </div>
    </PanelCard>

    <PanelCard title="类别结构与置信度" subtitle="当前使用图表作为右侧信息面板主占位">
      <div class="side-panel-dual">
        <BaseChart :options="eddyTypeOption" height="10rem" />
        <BaseChart :options="eddyConfidenceOption" height="10rem" />
      </div>
    </PanelCard>

    <PanelCard title="形态质控与样本结果" subtitle="结合形态特征雷达图和关键目标摘要">
      <div class="side-panel-scroll content-stack">
        <BaseChart :options="eddyMorphologyOption" height="8.8rem" />

        <div class="side-panel-note-list">
          <article v-for="item in eddyQualityRules.slice(0, 3)" :key="item.title" class="side-panel-note">
            <h4>{{ item.title }}</h4>
            <p>{{ item.detail }}</p>
          </article>
        </div>

        <div class="side-panel-mini-table">
          <article v-for="row in eddyFeatureRows.slice(0, 3)" :key="row.id" class="side-panel-mini-row">
            <div>
              <strong class="side-panel-mini-row__title">{{ row.id }} · {{ row.type }}</strong>
              <div class="side-panel-mini-row__sub">{{ row.center }} · {{ row.area }}</div>
            </div>
            <div class="side-panel-mini-row__meta">置信度 {{ row.confidence }}<br />边缘流速 {{ row.edgeSpeed }}</div>
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
  eddyFeatureRows,
  eddyMetrics,
  eddyQualityRules
} from '@/data/oceanDashboard'
import {
  createEddyConfidenceOption,
  createEddyMorphologyOption,
  createEddyTypeOption
} from '@/data/oceanCharts'

const eddyTypeOption = createEddyTypeOption()
const eddyConfidenceOption = createEddyConfidenceOption()
const eddyMorphologyOption = createEddyMorphologyOption()
</script>

<style lang="scss" scoped>
.content-stack {
  display: grid;
  gap: 0.82rem;
}
</style>
