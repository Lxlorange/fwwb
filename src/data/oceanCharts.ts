import * as echarts from 'echarts'
import {
  anomalyDistribution,
  anomalyTimeline,
  forecastHeatmap,
  forecastSeries
} from './oceanDashboard'

const textColor = '#e9fcff'
const mutedText = '#8fbfcb'
const splitLineColor = 'rgba(114, 221, 255, 0.1)'
const axisLineColor = 'rgba(114, 221, 255, 0.28)'
const tooltip = {
  trigger: 'axis',
  backgroundColor: 'rgba(2, 16, 24, 0.94)',
  borderColor: 'rgba(114, 221, 255, 0.25)',
  textStyle: { color: textColor }
}

const legend = {
  top: 0,
  icon: 'roundRect',
  textStyle: {
    color: mutedText,
    fontSize: 11
  }
}

const categoryAxis = (data: string[]) => ({
  type: 'category',
  data,
  axisLine: { lineStyle: { color: axisLineColor } },
  axisTick: { show: false },
  axisLabel: { color: mutedText, fontSize: 11 }
})

const valueAxis = (name = '') => ({
  type: 'value',
  name,
  nameTextStyle: { color: mutedText, padding: [0, 0, 0, 10] },
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: mutedText, fontSize: 11 },
  splitLine: { lineStyle: { color: splitLineColor } }
})

export const createGoalComplianceOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 36, right: 20, bottom: 26 },
  xAxis: categoryAxis(['涡旋识别', '多要素预测', '风浪异常']),
  yAxis: valueAxis('完成度'),
  series: [
    {
      name: '赛题门槛',
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: 'rgba(114, 221, 255, 0.28)',
        borderRadius: [8, 8, 0, 0]
      },
      data: [75, 85, 80]
    },
    {
      name: '当前结果',
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#72ddff' },
          { offset: 1, color: '#167ee6' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      data: [78.6, 88.2, 83.4]
    }
  ]
})

export const createThroughputOption = () => ({
  tooltip,
  grid: { top: 20, left: 36, right: 20, bottom: 26 },
  xAxis: categoryAxis(['03-09', '03-10', '03-11', '03-12', '03-13', '03-14', '03-15']),
  yAxis: valueAxis('任务量'),
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 3, color: '#72ddff' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(114, 221, 255, 0.4)' },
          { offset: 1, color: 'rgba(114, 221, 255, 0)' }
        ])
      },
      itemStyle: { color: '#d6f8ff' },
      data: [12, 15, 13, 18, 16, 21, 27]
    }
  ]
})

export const createTaskMixOption = () => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(2, 16, 24, 0.94)',
    borderColor: 'rgba(114, 221, 255, 0.25)',
    textStyle: { color: textColor }
  },
  legend: {
    bottom: 0,
    textStyle: { color: mutedText, fontSize: 11 }
  },
  series: [
    {
      type: 'pie',
      radius: ['58%', '76%'],
      center: ['50%', '44%'],
      label: { color: textColor, formatter: '{b}\n{d}%' },
      labelLine: { lineStyle: { color: axisLineColor } },
      itemStyle: { borderColor: '#031923', borderWidth: 3 },
      data: [
        { value: 32, name: '涡旋识别', itemStyle: { color: '#72ddff' } },
        { value: 28, name: '多要素预测', itemStyle: { color: '#22b7a3' } },
        { value: 22, name: '异常检测', itemStyle: { color: '#f5bf63' } },
        { value: 18, name: '数据预处理', itemStyle: { color: '#5578ff' } }
      ]
    }
  ]
})

export const createEddyTypeOption = () => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(2, 16, 24, 0.94)',
    borderColor: 'rgba(114, 221, 255, 0.25)',
    textStyle: { color: textColor }
  },
  series: [
    {
      type: 'pie',
      radius: ['54%', '76%'],
      center: ['50%', '50%'],
      label: { color: textColor, formatter: '{b}\n{c}' },
      itemStyle: { borderColor: '#031923', borderWidth: 3 },
      data: [
        { value: 9, name: '暖核涡', itemStyle: { color: '#72ddff' } },
        { value: 5, name: '冷核涡', itemStyle: { color: '#3458df' } },
        { value: 2, name: '待复核', itemStyle: { color: '#f5bf63' } }
      ]
    }
  ]
})

export const createEddyConfidenceOption = () => ({
  tooltip,
  grid: { top: 20, left: 36, right: 16, bottom: 26 },
  xAxis: categoryAxis(['ED-001', 'ED-004', 'ED-006', 'ED-011', 'ED-015']),
  yAxis: valueAxis('置信度'),
  series: [
    {
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#72ddff' },
          { offset: 1, color: '#1d7be8' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      data: [0.92, 0.88, 0.85, 0.78, 0.81]
    }
  ]
})

export const createEddyMorphologyOption = () => ({
  radar: {
    radius: '64%',
    splitNumber: 4,
    axisName: { color: mutedText },
    splitLine: { lineStyle: { color: splitLineColor } },
    splitArea: { areaStyle: { color: ['rgba(114, 221, 255, 0.02)', 'rgba(114, 221, 255, 0.04)'] } },
    axisLine: { lineStyle: { color: splitLineColor } },
    indicator: [
      { name: '闭合度', max: 100 },
      { name: '平滑度', max: 100 },
      { name: '面积稳定', max: 100 },
      { name: '温度梯度', max: 100 },
      { name: '流速匹配', max: 100 }
    ]
  },
  series: [
    {
      type: 'radar',
      symbolSize: 4,
      lineStyle: { color: '#72ddff', width: 2 },
      areaStyle: { color: 'rgba(114, 221, 255, 0.2)' },
      data: [{ value: [92, 87, 80, 84, 78] }]
    }
  ]
})

export const createForecastTrendOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 42, right: 48, bottom: 26 },
  xAxis: categoryAxis(forecastSeries.labels),
  yAxis: [valueAxis('温盐'), valueAxis('流速')],
  series: [
    {
      name: '温度',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#72ddff' },
      itemStyle: { color: '#72ddff' },
      data: forecastSeries.temperature
    },
    {
      name: '盐度',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#22b7a3' },
      itemStyle: { color: '#22b7a3' },
      data: forecastSeries.salinity
    },
    {
      name: '流速',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#f5bf63' },
      itemStyle: { color: '#f5bf63' },
      data: forecastSeries.current
    }
  ]
})

export const createForecastHeatmapOption = () => ({
  tooltip: {
    position: 'top',
    backgroundColor: 'rgba(2, 16, 24, 0.94)',
    borderColor: 'rgba(114, 221, 255, 0.25)',
    textStyle: { color: textColor }
  },
  grid: { top: 18, left: 48, right: 18, bottom: 32 },
  xAxis: {
    type: 'category',
    data: forecastHeatmap.xLabels,
    axisLine: { lineStyle: { color: axisLineColor } },
    axisTick: { show: false },
    axisLabel: { color: mutedText }
  },
  yAxis: {
    type: 'category',
    data: forecastHeatmap.yLabels,
    axisLine: { lineStyle: { color: axisLineColor } },
    axisTick: { show: false },
    axisLabel: { color: mutedText }
  },
  visualMap: {
    min: 0.4,
    max: 0.9,
    calculable: false,
    orient: 'horizontal',
    left: 'center',
    bottom: 0,
    textStyle: { color: mutedText },
    inRange: {
      color: ['#0e3250', '#135d8f', '#1aa9d5', '#76e4ff']
    }
  },
  series: [
    {
      type: 'heatmap',
      data: forecastHeatmap.values,
      label: { show: false },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.45)'
        }
      }
    }
  ]
})

export const createForecastErrorOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 36, right: 20, bottom: 26 },
  xAxis: categoryAxis(['24h', '48h', '72h', '96h']),
  yAxis: valueAxis('误差值'),
  series: [
    {
      name: '温度',
      type: 'bar',
      barWidth: 12,
      itemStyle: { color: '#72ddff', borderRadius: [6, 6, 0, 0] },
      data: [0.52, 0.68, 0.78, 0.91]
    },
    {
      name: '盐度',
      type: 'bar',
      barWidth: 12,
      itemStyle: { color: '#22b7a3', borderRadius: [6, 6, 0, 0] },
      data: [0.31, 0.39, 0.42, 0.48]
    },
    {
      name: '流速',
      type: 'bar',
      barWidth: 12,
      itemStyle: { color: '#f5bf63', borderRadius: [6, 6, 0, 0] },
      data: [8.4, 10.1, 11.8, 13.2]
    }
  ]
})

export const createAnomalyScoreOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 42, right: 48, bottom: 26 },
  xAxis: categoryAxis(anomalyTimeline.labels),
  yAxis: [valueAxis('异常分数'), valueAxis('最大风速')],
  series: [
    {
      name: '异常分数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#ff7c7c' },
      itemStyle: { color: '#ff7c7c' },
      markLine: {
        symbol: 'none',
        lineStyle: { color: '#f5bf63', type: 'dashed' },
        data: [{ yAxis: 1.5, name: '预警阈值' }]
      },
      data: anomalyTimeline.scores
    },
    {
      name: '最大风速',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#72ddff' },
      itemStyle: { color: '#72ddff' },
      data: anomalyTimeline.maxSpeed
    }
  ]
})

export const createRiskDistributionOption = () => ({
  tooltip,
  grid: { top: 20, left: 36, right: 16, bottom: 26 },
  xAxis: categoryAxis(anomalyDistribution.map(item => item.level)),
  yAxis: valueAxis('次数'),
  series: [
    {
      type: 'bar',
      barWidth: 18,
      itemStyle: {
        color: ({ dataIndex }: { dataIndex: number }) => ['#ff7c7c', '#f5bf63', '#2dbac0'][dataIndex],
        borderRadius: [8, 8, 0, 0]
      },
      data: anomalyDistribution.map(item => item.count)
    }
  ]
})

export const createTyphoonRelationOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 36, right: 20, bottom: 26 },
  xAxis: categoryAxis(['04-03', '04-06', '04-10', '04-13', '04-18', '04-23', '04-27', '04-30']),
  yAxis: valueAxis('指数'),
  series: [
    {
      name: '台风影响指数',
      type: 'line',
      smooth: true,
      lineStyle: { width: 2.5, color: '#3458df' },
      itemStyle: { color: '#3458df' },
      data: [0.3, 0.8, 0.42, 0.73, 0.35, 0.92, 0.61, 0.38]
    },
    {
      name: '异常联动指数',
      type: 'line',
      smooth: true,
      lineStyle: { width: 2.5, color: '#72ddff' },
      itemStyle: { color: '#72ddff' },
      data: [0.25, 0.76, 0.36, 0.64, 0.3, 0.87, 0.58, 0.34]
    }
  ]
})

export const createDatasetFreshnessOption = () => ({
  tooltip,
  grid: { top: 20, left: 36, right: 16, bottom: 26 },
  xAxis: categoryAxis(['涡旋识别', '风浪异常', '风速流场', '台风事件']),
  yAxis: valueAxis('小时'),
  series: [
    {
      type: 'bar',
      barWidth: 18,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#72ddff' },
          { offset: 1, color: '#1d7be8' }
        ]),
        borderRadius: [8, 8, 0, 0]
      },
      data: [1.2, 0.9, 1.1, 54]
    }
  ]
})

export const createTaskQueueOption = () => ({
  tooltip,
  legend,
  grid: { top: 48, left: 36, right: 20, bottom: 26 },
  xAxis: categoryAxis(['09:00', '10:30', '12:00', '13:30', '15:00', '16:30']),
  yAxis: valueAxis('任务数'),
  series: [
    {
      name: '排队任务',
      type: 'bar',
      barWidth: 16,
      itemStyle: { color: 'rgba(114, 221, 255, 0.3)', borderRadius: [6, 6, 0, 0] },
      data: [3, 4, 5, 3, 2, 2]
    },
    {
      name: '完成任务',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { width: 2.5, color: '#22b7a3' },
      itemStyle: { color: '#22b7a3' },
      data: [5, 8, 11, 16, 21, 27]
    }
  ]
})
