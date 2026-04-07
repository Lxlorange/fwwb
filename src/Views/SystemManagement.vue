<template>
  <div class="side-panel-page">
    <PanelCard title="系统摘要" subtitle="数据、模型、任务与导出状态总览">
      <div class="side-panel-metrics">
        <MetricCard
          v-for="item in systemMetrics"
          :key="item.label"
          v-bind="item"
          compact
        />
      </div>
    </PanelCard>

    <PanelCard title="数据与任务调度" subtitle="保留系统管理页的两张核心运行图表">
      <div class="side-panel-chart-stack">
        <BaseChart :options="datasetFreshnessOption" height="8.4rem" />
        <BaseChart :options="taskQueueOption" height="9.2rem" />
      </div>
    </PanelCard>

    <PanelCard title="资源与导出" subtitle="保留数据集、模型版本和结果导出信息">
      <div class="side-panel-scroll content-stack">
        <section>
          <h4 class="section-title">数据集</h4>
          <div class="side-panel-mini-table">
            <article v-for="row in datasets.slice(0, 2)" :key="row.name" class="side-panel-mini-row">
              <div>
                <strong class="side-panel-mini-row__title">{{ row.name }}</strong>
                <div class="side-panel-mini-row__sub">{{ row.type }} · {{ row.domain }}</div>
              </div>
              <div class="side-panel-mini-row__meta">{{ row.size }}<br />{{ row.freshness }}</div>
            </article>
          </div>
        </section>

        <section>
          <h4 class="section-title">模型版本</h4>
          <div class="side-panel-note-list">
            <article v-for="item in modelVersions.slice(0, 2)" :key="item.name" class="side-panel-note">
              <span>{{ item.task }} · {{ item.status }}</span>
              <h4>{{ item.name }}</h4>
              <p>{{ item.metrics }}，{{ item.note }}</p>
            </article>
          </div>
        </section>

        <section>
          <h4 class="section-title">导出包</h4>
          <div class="side-panel-list-row">
            <article v-for="item in exportPackages.slice(0, 2)" :key="item.name" class="side-panel-list-item">
              <strong>{{ item.name }}</strong>
              <span>{{ item.format }}</span>
              <p>{{ item.content }}</p>
            </article>
          </div>
        </section>
      </div>
    </PanelCard>
  </div>
</template>

<script lang="ts" setup>
import BaseChart from '@/components/dashboard/BaseChart.vue'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import PanelCard from '@/components/dashboard/PanelCard.vue'
import {
  datasets,
  exportPackages,
  modelVersions,
  systemMetrics
} from '@/data/oceanDashboard'
import {
  createDatasetFreshnessOption,
  createTaskQueueOption
} from '@/data/oceanCharts'

const datasetFreshnessOption = createDatasetFreshnessOption()
const taskQueueOption = createTaskQueueOption()
</script>

<style lang="scss" scoped>
.content-stack {
  display: grid;
  gap: 0.82rem;
}

.section-title {
  margin: 0 0 0.55rem;
  font-size: 0.82rem;
  color: var(--accent);
}
</style>
