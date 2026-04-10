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
import { onMounted } from 'vue';
import { detectWindWaveAnomaly, createWorkOrder } from '@/api/index';

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


onMounted(async () => {
  try {
    const res = await detectWindWaveAnomaly({
      recent_data: [
        { wind_speed: 15.2, wave_height: 3.5 },
        { wind_speed: 18.5, wave_height: 4.2 }
      ],
      latitude: 22.5,
      longitude: 114.0,
      timestamp: new Date().toISOString()
    });
    console.log('风浪预警分析结果:', res);

    if (res.warning_level === 'MEDIUM' || res.warning_level === 'HIGH' || res.suggest_sink) {
      console.log('触发高级预警，自动生成工单任务...');
      const orderRes = await createWorkOrder({
        alarm_id: 'ALARM-' + new Date().getTime(),
        description: '系统检测到风浪异常等级为 ' + res.warning_level + '，需派员立即检查深海网箱沉降状态。'
      });
      console.log('工单生成成功:', orderRes);
    }
  } catch (err) {
    console.error('API Error in WaveAnomaly:', err);
  }
});

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
