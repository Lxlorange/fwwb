import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/overview'
  },
  {
    path: 'overview',
    name: 'overview',
    component: () => import('@/Views/HomeOverview.vue'),
    meta: {
      title: '首页总览',
      description: '聚焦项目价值、关键指标、最近任务和异常概览。'
    }
  },
  {
    path: 'eddy',
    name: 'eddy',
    component: () => import('@/Views/EddyRecognition.vue'),
    meta: {
      title: '涡旋识别',
      description: '查看原图、分割结果、边界叠加和涡旋识别统计。'
    }
  },
  {
    path: 'forecast',
    name: 'forecast',
    component: () => import('@/Views/ForecastAnalysis.vue'),
    meta: {
      title: '多要素预测',
      description: '展示温度、盐度、流速等要素的时间序列、空间分布和误差指标。'
    }
  },
  {
    path: 'anomaly',
    name: 'anomaly',
    component: () => import('@/Views/WaveAnomaly.vue'),
    meta: {
      title: '风浪异常',
      description: '汇总异常记录、风险等级、台风关联和预警列表。'
    }
  },
  {
    path: 'system',
    name: 'system',
    component: () => import('@/Views/SystemManagement.vue'),
    meta: {
      title: '系统管理',
      description: '统一管理数据集、模型版本、任务记录和结果导出。'
    }
  }
]
