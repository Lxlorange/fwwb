<template>
  <div class="side-panel-page">
    <PanelCard title="异常摘要" subtitle="当前保留风浪异常监测的核心风险指标">
      <div class="side-panel-metrics">
        <MetricCard
          v-for="item in anomalyMetrics"
          :key="item.label"
          v-bind="item"
          compact
        />
      </div>
    </PanelCard>

    <PanelCard title="异常得分与风险分布" subtitle="使用现有图表作为右侧风险分析占位">
      <div class="side-panel-chart-stack">
        <BaseChart :options="anomalyScoreOption" height="9.6rem" />
        <BaseChart :options="riskDistributionOption" height="8rem" />
      </div>
    </PanelCard>

    <PanelCard title="预警与台风关联" subtitle="保留重点预警任务及历史台风关联说明">
      <div class="side-panel-scroll content-stack">
        <section>
          <h4 class="section-title">预警列表</h4>
          <div class="side-panel-list-row">
            <article v-for="item in warningList.slice(0, 3)" :key="item.id" class="side-panel-list-item">
              <strong>{{ item.id }} · {{ item.area }}</strong>
              <span>{{ item.level }}风险 · {{ item.owner }}</span>
              <p>{{ item.action }}</p>
            </article>
          </div>
        </section>

        <section>
          <h4 class="section-title">台风关联</h4>
          <div class="side-panel-note-list">
            <article v-for="item in typhoonLinks.slice(0, 2)" :key="item.name" class="side-panel-note">
              <span>{{ item.period }}</span>
              <h4>{{ item.name }}</h4>
              <p>{{ item.relation }}</p>
            </article>
          </div>
        </section>

        <section>
          <h4 class="section-title">异常样本</h4>
          <div class="side-panel-mini-table">
            <article v-for="row in anomalyRecords.slice(0, 2)" :key="row.timestamp" class="side-panel-mini-row">
              <div>
                <strong class="side-panel-mini-row__title">{{ row.timestamp }}</strong>
                <div class="side-panel-mini-row__sub">风速 {{ row.wind }} · 等级 {{ row.level }}</div>
              </div>
              <div class="side-panel-mini-row__meta">分数 {{ row.score }}<br />{{ row.summary }}</div>
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
  anomalyMetrics,
  anomalyRecords,
  typhoonLinks,
  warningList
} from '@/data/oceanDashboard'
import {
  createAnomalyScoreOption,
  createRiskDistributionOption
} from '@/data/oceanCharts'

const anomalyScoreOption = createAnomalyScoreOption()
const riskDistributionOption = createRiskDistributionOption()
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
