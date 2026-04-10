<template>
  <div class="side-panel-page">
    <!-- 查询操纵台 -->
    <PanelCard title="NetCDF 数据操控台" subtitle="在此配置参数与后端获取海洋时序数据">
      <div class="playground-control">
        <div class="input-group">
          <div class="input-item">
            <label>纬度 Lat</label>
            <input type="number" v-model="form.lat" step="0.1" />
          </div>
          <div class="input-item">
            <label>经度 Lon</label>
            <input type="number" v-model="form.lon" step="0.1" />
          </div>
        </div>

        <div class="input-group">
          <div class="input-item">
            <label>开始时间</label>
            <input type="date" v-model="form.start_date" />
          </div>
          <div class="input-item">
            <label>结束时间</label>
            <input type="date" v-model="form.end_date" />
          </div>
        </div>

        <button class="action-btn" @click="fetchBackendData" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? '解析中...' : '开始提取数据' }}
        </button>
      </div>
    </PanelCard>

    <!-- 动态折线图面板 -->
    <PanelCard title="数据可视化展示" subtitle="实时呈现后端的 NC 序列反馈">
      <!-- 获取到数据才渲染，否则展示占位 -->
      <BaseChart v-if="chartOptions" :options="chartOptions" height="15rem" />
      <div v-else class="empty-placeholder">
        <span class="placeholder-tag">NO DATA</span>
        <p>设定坐标和时间，点击上方提取按钮开始加载</p>
      </div>
    </PanelCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PanelCard from '@/components/dashboard/PanelCard.vue';
import BaseChart from '@/components/dashboard/BaseChart.vue';
import { getNcExtractData } from '@/api/index';

const loading = ref(false);
const chartOptions = ref<any>(null);
const form = ref({
  lat: 22.5,
  lon: 114.0,
  start_date: '2026-04-01',
  end_date: '2026-04-04'
});

const fetchBackendData = async () => {
  loading.value = true;
  chartOptions.value = null; // 重置视图
  try {
    const res = await getNcExtractData({
      start_time: `${form.value.start_date}T00:00:00Z`,
      end_time: `${form.value.end_date}T23:59:59Z`,
      lat: form.value.lat,
      lon: form.value.lon
    });

    // 转义输出，组装 ECharts 图表参数
    const times = res.series.map(item => {
      const d = new Date(item.time);
      return `${d.getMonth()+1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:00`;
    });
    const sstData = res.series.map(item => item.sst);
    const waveData = res.series.map(item => item.wave_height);

    chartOptions.value = {
      grid: {
        bottom: 24, top: 32, left: 32, right: 32
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(9, 38, 54, 0.9)',
        borderColor: 'rgba(114, 221, 255, 0.2)',
        textStyle: { color: '#ebfdff' }
      },
      legend: { data: ['SST 温度', '波高'], textStyle: { color: "rgba(226, 247, 255, 0.82)" }, top: 0 },
      xAxis: { type: 'category', data: times, axisLabel: { color: 'rgba(232, 250, 255, 0.72)' } },
      yAxis: [
        { type: 'value', name: '℃', splitLine: { show: false }, axisLabel: {color:'rgba(232, 250, 255, 0.72)'}},
        { type: 'value', name: 'm', splitLine: { show: false }, alignTicks: true, axisLabel:{color:'rgba(232, 250, 255, 0.72)'}}
      ],
      series: [
        { name: 'SST 温度', type: 'line', smooth: true, yAxisIndex: 0, data: sstData, itemStyle: { color: '#72ddff' } },
        { name: '波高', type: 'bar', yAxisIndex: 1, data: waveData, itemStyle: { color: 'rgba(23, 126, 230, 0.8)' }, barWidth: '30%' }
      ]
    };
  } catch (error) {
    console.error("提取失败：", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.side-panel-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.playground-control {
  display: grid;
  gap: 1.15rem;
  padding: 0.5rem 0.2rem;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    color: var(--text-secondary, rgba(226, 247, 255, 0.82));
    font-size: 0.75rem;
    letter-spacing: 0.05rem;
  }

  input {
    width: 100%;
    background: rgba(114, 221, 255, 0.04);
    border: 1px solid rgba(114, 221, 255, 0.18);
    border-radius: 0.45rem;
    padding: 0.55rem 0.75rem;
    color: #ebfdff;
    font-family: inherit;
    font-size: 0.85rem;
    outline: none;
    transition: all 0.2s ease;
    color-scheme: dark;

    &:focus, &:hover {
      background: rgba(114, 221, 255, 0.08);
      border-color: rgba(114, 221, 255, 0.4);
      box-shadow: 0 0 12px rgba(114, 221, 255, 0.1);
    }
  }
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.4rem;
  background: linear-gradient(90deg, rgba(17, 109, 198, 0.85) 0%, rgba(64, 196, 255, 0.85) 100%);
  border: 1px solid rgba(114, 221, 255, 0.3);
  border-radius: 0.55rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.08rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, rgba(17, 109, 198, 0.95) 0%, rgba(64, 196, 255, 0.95) 100%);
    box-shadow: 0 8px 24px rgba(64, 196, 255, 0.24);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(40%);
  }
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-placeholder {
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px dashed rgba(114, 221, 255, 0.15);
  border-radius: 0.8rem;
  background: rgba(114, 221, 255, 0.02);

  .placeholder-tag {
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(114, 221, 255, 0.18);
    background: rgba(114, 221, 255, 0.08);
    color: var(--accent, #72ddff);
    font-size: 0.65rem;
    letter-spacing: 0.12rem;
  }

  p {
    margin: 0;
    color: var(--text-muted, rgba(232, 250, 255, 0.5));
    font-size: 0.8rem;
  }
}
</style>