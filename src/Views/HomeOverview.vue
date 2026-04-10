<template>
  <div class="side-panel-page">
    <PanelCard title="首页总览" subtitle="项目价值、关键指标与整体运行状态">
      <div class="side-panel-metrics">
        <MetricCard
          v-for="item in overviewMetrics"
          :key="item.label"
          v-bind="item"
          compact
        />
      </div>
    </PanelCard>

    <PanelCard title="指标达标与任务吞吐" subtitle="保留首页最关键的两组概览图表">
      <div class="side-panel-chart-stack">
        <BaseChart :options="goalComplianceOption" height="9.4rem" />
        <BaseChart :options="throughputOption" height="8.4rem" />
      </div>
    </PanelCard>

    <PanelCard title="价值与动态" subtitle="展示系统价值、最近任务和异常摘要">
      <div class="side-panel-scroll content-stack">
        <div class="side-panel-note-list">
          <article v-for="item in overviewValueCards.slice(0, 2)" :key="item.tag" class="side-panel-note">
            <span>{{ item.tag }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </article>
        </div>

        <section>
          <h4 class="section-title">最近任务</h4>
          <div class="side-panel-mini-table">
            <article v-for="task in recentTasks.slice(0, 3)" :key="task.id" class="side-panel-mini-row">
              <div>
                <strong class="side-panel-mini-row__title">{{ task.type }}</strong>
                <div class="side-panel-mini-row__sub">{{ task.area }} · {{ task.id }}</div>
              </div>
              <div class="side-panel-mini-row__meta">{{ task.status }}<br />{{ task.updatedAt }}</div>
            </article>
          </div>
        </section>

        <section>
          <h4 class="section-title">异常概览</h4>
          <div class="side-panel-list-row">
            <article v-for="item in anomalyOverview.slice(0, 2)" :key="item.title" class="side-panel-list-item">
              <strong>{{ item.title }}</strong>
              <span>{{ item.time }} · {{ item.level }}风险</span>
              <p>{{ item.action }}</p>
            </article>
          </div>
        </section>
      </div>
    </PanelCard>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { detectTrash } from '@/api/index';

import BaseChart from '@/components/dashboard/BaseChart.vue'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import PanelCard from '@/components/dashboard/PanelCard.vue'
import {
  anomalyOverview,
  overviewMetrics,
  overviewValueCards,
  recentTasks
} from '@/data/oceanDashboard'
import {
  createGoalComplianceOption,
  createThroughputOption
} from '@/data/oceanCharts'

const goalComplianceOption = createGoalComplianceOption()
const throughputOption = createThroughputOption()


onMounted(async () => {
  try {
    // 这里使用一份 mock Base64 作为测试
    const mockImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."; 
    const res = await detectTrash({
      image_base64: mockImageBase64
    });
    console.log('海洋垃圾 CV 识别结果:', res);
  } catch (err) {
    console.error('API Error in HomeOverview:', err);
  }
});

</script>

<style lang="scss" scoped>
.content-stack {
  display: grid;
  gap: 0.85rem;
}

.section-title {
  margin: 0 0 0.55rem;
  font-size: 0.82rem;
  color: var(--accent);
}
</style>
