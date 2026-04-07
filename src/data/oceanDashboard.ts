export type Tone = 'good' | 'warning' | 'danger' | 'info'

export interface NavigationItem {
  label: string
  short: string
  icon: string
  path: string
  description: string
}

export interface MetricCardData {
  label: string
  value: string
  unit: string
  trend: string
  note: string
  tone: Tone
}

export interface KeyValueItem {
  label: string
  value: string
}

export const navigationItems: NavigationItem[] = [
  {
    label: '首页总览',
    short: 'Overview',
    icon: '总',
    path: '/overview',
    description: '围绕项目价值、关键指标、最近任务和异常概览搭建决策入口。'
  },
  {
    label: '涡旋识别',
    short: 'Eddy AI',
    icon: '涡',
    path: '/eddy',
    description: '面向中尺度涡旋识别的原图、分割、边界和统计一体化展示。'
  },
  {
    label: '多要素预测',
    short: 'Forecast',
    icon: '预',
    path: '/forecast',
    description: '聚焦温度、盐度、流速的 72 小时以上预测分析。'
  },
  {
    label: '风浪异常',
    short: 'Alert',
    icon: '警',
    path: '/anomaly',
    description: '联动异常记录、风险等级、台风关联和预警任务。'
  },
  {
    label: '系统管理',
    short: 'System',
    icon: '管',
    path: '/system',
    description: '统一管理数据集、模型版本、任务记录和结果导出。'
  }
]

export const systemPulse = [
  { label: '实时数据流', value: '48', unit: '路', detail: 'NetCDF 与图像任务持续接入' },
  { label: '在线模型', value: '06', unit: '个', detail: '识别、预测、异常模型并行推理' },
  { label: '预测窗口', value: '96', unit: '小时', detail: '满足赛题 72 小时以上预测要求' },
  { label: '高风险告警', value: '03', unit: '条', detail: '优先推送风浪与台风耦合事件' }
]

export const overviewMetrics: MetricCardData[] = [
  {
    label: '涡旋识别准确率',
    value: '78.6',
    unit: '%',
    trend: '+3.2%',
    note: '高于赛题 75% 下限',
    tone: 'good'
  },
  {
    label: '多要素预测 MSE',
    value: '11.8',
    unit: '%',
    trend: '-1.6%',
    note: '温盐流联合预测已达标',
    tone: 'good'
  },
  {
    label: '风浪异常识别准确率',
    value: '83.4',
    unit: '%',
    trend: '+4.1%',
    note: '结合规则引擎提升稳定性',
    tone: 'good'
  },
  {
    label: '待处置风险事件',
    value: '03',
    unit: '件',
    trend: '2 高 1 中',
    note: '已关联港口作业窗口',
    tone: 'warning'
  }
]

export const overviewValueCards = [
  {
    tag: '01',
    title: '海洋灾害预警',
    description: '通过识别 + 预测 + 预警闭环提前发现风浪异常，为灾害响应争取时间。'
  },
  {
    tag: '02',
    title: '港口航运保障',
    description: '利用未来 72 小时以上环境预测结果，为航线规划和作业窗口安排提供依据。'
  },
  {
    tag: '03',
    title: '资源开发与生态保护',
    description: '持续监测重点海域环境变化，为海洋工程部署、智慧养殖和生态保护提供支撑。'
  }
]

export const overviewCommitments: KeyValueItem[] = [
  { label: '识别准确率目标', value: '>= 75%' },
  { label: '预测误差目标', value: 'MSE <= 15%' },
  { label: '异常识别目标', value: '>= 80%' },
  { label: '展示闭环', value: '识别 - 预测 - 预警' }
]

export const missionPipeline = [
  {
    step: '数据预处理',
    status: '稳定运行',
    description: '完成 NetCDF 解析、归一化、时空切片和数据字典管理。'
  },
  {
    step: '涡旋识别',
    status: '模型在线',
    description: 'UNet++ 输出边界分割、闭合轮廓和形态特征统计。'
  },
  {
    step: '多要素预测',
    status: '滚动推理',
    description: '温度、盐度、流速联合预测覆盖未来 96 小时。'
  },
  {
    step: '风浪异常',
    status: '告警活跃',
    description: '异常分数与阈值规则双判定，当前有 3 条重点预警。'
  },
  {
    step: '结果服务',
    status: '可导出',
    description: '图表、日志、截图和告警清单支持快速导出。'
  }
]

export const recentTasks = [
  {
    id: 'TASK-20260315-014',
    type: '多要素预测',
    area: '南海北部',
    status: '已完成',
    duration: '08m 24s',
    updatedAt: '2026-03-15 15:56'
  },
  {
    id: 'TASK-20260315-011',
    type: '风浪异常检测',
    area: '台湾海峡',
    status: '告警已推送',
    duration: '03m 42s',
    updatedAt: '2026-03-15 15:40'
  },
  {
    id: 'TASK-20260315-009',
    type: '涡旋识别',
    area: '西北太平洋',
    status: '复核中',
    duration: '05m 13s',
    updatedAt: '2026-03-15 15:21'
  },
  {
    id: 'TASK-20260315-006',
    type: '多要素预测',
    area: '东海近岸',
    status: '已完成',
    duration: '07m 58s',
    updatedAt: '2026-03-15 14:48'
  },
  {
    id: 'TASK-20260315-003',
    type: '风浪异常检测',
    area: '黄海南部',
    status: '已完成',
    duration: '04m 11s',
    updatedAt: '2026-03-15 14:06'
  }
]

export const anomalyOverview = [
  {
    time: '03-15 15:40',
    level: '高',
    title: '台湾海峡风浪耦合异常',
    action: '建议压缩港口外海作业窗口，并持续观察 12 小时。'
  },
  {
    time: '03-15 12:30',
    level: '中',
    title: '南海北部流速梯度放大',
    action: '影响养殖浮标稳定性，建议提高巡检频次。'
  },
  {
    time: '03-15 09:10',
    level: '高',
    title: '西北太平洋暖核涡边界收缩',
    action: '触发识别复核任务，建议保留识别结果用于模型迭代。'
  },
  {
    time: '03-14 22:20',
    level: '低',
    title: '黄海南部波高短时抬升',
    action: '已进入自动观察队列，暂不触发人工介入。'
  }
]

export const eddyMetrics: MetricCardData[] = [
  {
    label: '候选涡旋目标',
    value: '16',
    unit: '个',
    trend: '+2',
    note: '当前批次共识别 16 个候选区域',
    tone: 'info'
  },
  {
    label: '闭合边界通过数',
    value: '14',
    unit: '个',
    trend: '87.5%',
    note: '边界闭合率稳定',
    tone: 'good'
  },
  {
    label: '平均识别置信度',
    value: '0.84',
    unit: '',
    trend: '+0.03',
    note: '主模型为 eddy-unetpp-v2.3',
    tone: 'good'
  },
  {
    label: '暖核涡占比',
    value: '56',
    unit: '%',
    trend: '9 / 16',
    note: '暖核涡数量略高于冷核涡',
    tone: 'warning'
  }
]

export const eddyFeatureRows = [
  {
    id: 'ED-001',
    type: '暖核涡',
    center: '21.6N / 122.4E',
    area: '184 km2',
    edgeSpeed: '0.83 m/s',
    confidence: '0.92'
  },
  {
    id: 'ED-004',
    type: '冷核涡',
    center: '22.4N / 123.2E',
    area: '136 km2',
    edgeSpeed: '0.74 m/s',
    confidence: '0.88'
  },
  {
    id: 'ED-006',
    type: '暖核涡',
    center: '20.9N / 121.7E',
    area: '205 km2',
    edgeSpeed: '0.91 m/s',
    confidence: '0.85'
  },
  {
    id: 'ED-011',
    type: '冷核涡',
    center: '23.2N / 124.1E',
    area: '97 km2',
    edgeSpeed: '0.63 m/s',
    confidence: '0.78'
  },
  {
    id: 'ED-015',
    type: '暖核涡',
    center: '21.1N / 123.8E',
    area: '148 km2',
    edgeSpeed: '0.69 m/s',
    confidence: '0.81'
  }
]

export const eddyQualityRules = [
  {
    title: '边界闭合校验',
    detail: '闭合度 >= 0.85 的轮廓自动进入有效目标池。'
  },
  {
    title: '形态连续性',
    detail: '通过轮廓平滑度、面积突变率筛除异常候选。'
  },
  {
    title: '温度梯度判别',
    detail: '暖核与冷核涡通过局部温度梯度方向进行二次确认。'
  },
  {
    title: '人工复核入口',
    detail: '低于 0.80 置信度的目标保留人工复核标记。'
  }
]

export const eddyStageTags = {
  source: ['海温原图', '梯度纹理', '候选区域待提取'],
  segmentation: ['模型分割掩膜', '暖核涡=青色', '冷核涡=深蓝'],
  overlay: ['边界叠加', '中心点定位', '低置信目标高亮']
}

export const forecastMetrics: MetricCardData[] = [
  {
    label: '未来预测窗口',
    value: '96',
    unit: '小时',
    trend: '+24h',
    note: '高于赛题最低要求',
    tone: 'good'
  },
  {
    label: '温度 RMSE',
    value: '0.78',
    unit: '°C',
    trend: '-0.06',
    note: '24h - 72h 区间稳定',
    tone: 'good'
  },
  {
    label: '盐度 MAE',
    value: '0.42',
    unit: 'psu',
    trend: '-0.03',
    note: '南海北部误差最小',
    tone: 'good'
  },
  {
    label: '流速 MSE',
    value: '11.8',
    unit: '%',
    trend: '-1.2%',
    note: '已满足 MSE <= 15%',
    tone: 'good'
  }
]

export const forecastSeries = {
  labels: ['T+0', 'T+6', 'T+12', 'T+18', 'T+24', 'T+36', 'T+48', 'T+60', 'T+72', 'T+84', 'T+90', 'T+96'],
  temperature: [24.6, 24.5, 24.3, 24.2, 24.0, 23.8, 23.7, 23.9, 24.1, 24.4, 24.6, 24.7],
  salinity: [33.8, 33.7, 33.6, 33.6, 33.5, 33.4, 33.4, 33.5, 33.6, 33.7, 33.8, 33.8],
  current: [1.26, 1.22, 1.18, 1.14, 1.1, 1.06, 1.02, 1.08, 1.13, 1.18, 1.21, 1.24]
}

export const forecastHeatmap = {
  xLabels: ['118E', '119E', '120E', '121E', '122E', '123E', '124E'],
  yLabels: ['18N', '19N', '20N', '21N', '22N', '23N'],
  values: [
    [0, 0, 0.62], [1, 0, 0.66], [2, 0, 0.69], [3, 0, 0.74], [4, 0, 0.77], [5, 0, 0.72], [6, 0, 0.65],
    [0, 1, 0.58], [1, 1, 0.64], [2, 1, 0.7], [3, 1, 0.78], [4, 1, 0.81], [5, 1, 0.75], [6, 1, 0.67],
    [0, 2, 0.55], [1, 2, 0.61], [2, 2, 0.72], [3, 2, 0.83], [4, 2, 0.88], [5, 2, 0.79], [6, 2, 0.69],
    [0, 3, 0.53], [1, 3, 0.59], [2, 3, 0.68], [3, 3, 0.8], [4, 3, 0.85], [5, 3, 0.77], [6, 3, 0.64],
    [0, 4, 0.49], [1, 4, 0.56], [2, 4, 0.63], [3, 4, 0.71], [4, 4, 0.75], [5, 4, 0.69], [6, 4, 0.6],
    [0, 5, 0.44], [1, 5, 0.5], [2, 5, 0.57], [3, 5, 0.64], [4, 5, 0.69], [5, 5, 0.63], [6, 5, 0.55]
  ]
}

export const forecastErrorRows = [
  { horizon: '24h', temperature: '0.52 °C', salinity: '0.31 psu', current: '8.4 %', status: '最优' },
  { horizon: '48h', temperature: '0.68 °C', salinity: '0.39 psu', current: '10.1 %', status: '稳定' },
  { horizon: '72h', temperature: '0.78 °C', salinity: '0.42 psu', current: '11.8 %', status: '达标' },
  { horizon: '96h', temperature: '0.91 °C', salinity: '0.48 psu', current: '13.2 %', status: '可控' }
]

export const forecastInsights = [
  '温度与盐度曲线呈现一致性回落，48 小时后进入稳定回升区间。',
  '流速场在 121E - 123E、20N - 22N 区域形成高值带，适合作为空间分布主展示区。',
  '72 小时预测误差已控制在赛题要求范围内，可直接用于答辩展示和系统联调。'
]

export const anomalyMetrics: MetricCardData[] = [
  {
    label: '累计异常告警',
    value: '121',
    unit: '次',
    trend: '2025-04',
    note: '来源于 wind_alert_log.csv',
    tone: 'warning'
  },
  {
    label: '最高风速',
    value: '23.88',
    unit: 'm/s',
    trend: '峰值',
    note: '异常窗口内观测最大值',
    tone: 'danger'
  },
  {
    label: '最高异常分数',
    value: '3.64',
    unit: '',
    trend: '高风险',
    note: '对应规则引擎最高阈值段',
    tone: 'danger'
  },
  {
    label: '重点关联台风',
    value: '03',
    unit: '个',
    trend: '路径叠加',
    note: '用于异常解释和预警说明',
    tone: 'info'
  }
]

export const anomalyTimeline = {
  labels: ['04-04 00', '04-04 06', '04-04 09', '04-04 12', '04-05 00', '04-05 03', '04-05 06', '04-05 09', '04-05 12', '04-05 15', '04-05 18', '04-06 00'],
  scores: [2.4009, 1.4339, 1.6475, 2.5937, 1.7171, 1.0919, 1.0314, 1.0327, 1.0434, 1.0004, 1.0164, 1.0103],
  maxSpeed: [18.5177, 18.0015, 18.8347, 17.0784, 18.0056, 18.624, 18.5657, 18.5883, 18.7807, 18.0066, 18.2948, 18.1852]
}

export const anomalyDistribution = [
  { level: '高风险', count: 19 },
  { level: '中风险', count: 29 },
  { level: '低风险', count: 73 }
]

export const anomalyRecords = [
  {
    timestamp: '2025-04-04 00:00',
    score: '2.4009',
    wind: '18.52 m/s',
    level: '高',
    summary: '最大风速阈值触发，建议提高观测频率。'
  },
  {
    timestamp: '2025-04-04 12:00',
    score: '2.5937',
    wind: '17.08 m/s',
    level: '高',
    summary: '标准分数异常显著，建议同步排查波高变化。'
  },
  {
    timestamp: '2025-04-05 09:00',
    score: '1.0327',
    wind: '18.59 m/s',
    level: '中',
    summary: '最大风速持续偏高，进入连续监控列表。'
  },
  {
    timestamp: '2025-04-05 12:00',
    score: '1.0434',
    wind: '18.78 m/s',
    level: '中',
    summary: '波浪和风速同步波动，建议维持黄色预警。'
  },
  {
    timestamp: '2025-04-06 00:00',
    score: '1.0103',
    wind: '18.19 m/s',
    level: '低',
    summary: '异常分数回落，继续自动观察。'
  }
]

export const typhoonLinks = [
  {
    name: 'Typhoon Meari',
    period: '2025-04-03 至 2025-04-06',
    relation: '路径外缘与异常海域重叠，风速峰值抬升。'
  },
  {
    name: 'Typhoon Nari',
    period: '2025-04-11 至 2025-04-14',
    relation: '外围环流增强流场扰动，异常分数上浮 0.4。'
  },
  {
    name: 'Typhoon Koppu',
    period: '2025-04-22 至 2025-04-25',
    relation: '历史相似事件用于风险等级校正和解释。'
  }
]

export const warningList = [
  {
    id: 'WARN-0404-001',
    level: '高',
    area: '台湾海峡北部',
    action: '压缩 6 小时外海作业窗口',
    owner: '港口调度'
  },
  {
    id: 'WARN-0404-004',
    level: '高',
    area: '南海东北缘',
    action: '提前转移浮标维护任务',
    owner: '海工运维'
  },
  {
    id: 'WARN-0405-011',
    level: '中',
    area: '东海近岸',
    action: '保持黄色预警并复测波高',
    owner: '海洋监测'
  },
  {
    id: 'WARN-0406-003',
    level: '低',
    area: '黄海南部',
    action: '留在自动观察队列',
    owner: '系统自动'
  }
]

export const systemMetrics: MetricCardData[] = [
  {
    label: '已接入数据集',
    value: '12',
    unit: '套',
    trend: '+3',
    note: '覆盖涡旋、风浪、历史事件等',
    tone: 'info'
  },
  {
    label: '模型版本',
    value: '06',
    unit: '个',
    trend: '3 主 3 备',
    note: '支持快速切换和回滚',
    tone: 'good'
  },
  {
    label: '今日任务数',
    value: '27',
    unit: '次',
    trend: '完成率 92%',
    note: '批处理与实时推理并行',
    tone: 'good'
  },
  {
    label: '结果导出包',
    value: '18',
    unit: '份',
    trend: '日报 + 答辩素材',
    note: '支持图表、日志、截图汇总',
    tone: 'warning'
  }
]

export const datasets = [
  {
    name: '中尺度涡识别.nc',
    type: 'NetCDF',
    domain: '西北太平洋',
    freshness: '2026-03-15 10:22',
    size: '1.4 GB'
  },
  {
    name: 'data_stream-wave_stepType-instant.nc',
    type: 'NetCDF',
    domain: '风浪异常',
    freshness: '2026-03-15 11:03',
    size: '832 MB'
  },
  {
    name: 'data_stream-oper_stepType-instant.nc',
    type: 'NetCDF',
    domain: '风速流场',
    freshness: '2026-03-15 10:58',
    size: '1.1 GB'
  },
  {
    name: 'historical_typhoon_events.csv',
    type: 'CSV',
    domain: '台风事件',
    freshness: '2026-03-12 18:30',
    size: '15 MB'
  }
]

export const modelVersions = [
  {
    name: 'eddy-unetpp-v2.3',
    task: '涡旋识别',
    status: '在线',
    metrics: 'Acc 78.6% / IoU 0.81',
    note: '当前默认推理版本'
  },
  {
    name: 'hydro-tcn-v1.8',
    task: '多要素预测',
    status: '在线',
    metrics: 'MSE 11.8% / Horizon 96h',
    note: '支持温盐流联合预测'
  },
  {
    name: 'windwave-ae-v1.4',
    task: '异常识别',
    status: '在线',
    metrics: 'Acc 83.4% / MaxScore 3.64',
    note: '结合规则引擎输出预警'
  },
  {
    name: 'eddy-deeplabv3-v1.9',
    task: '涡旋识别备份',
    status: '待切换',
    metrics: 'Acc 76.9% / IoU 0.78',
    note: '用于对比实验和消融'
  }
]

export const taskRecords = [
  {
    id: 'JOB-0315-201',
    module: '数据预处理',
    queue: '批处理',
    status: '已完成',
    duration: '02m 16s',
    output: '样本切片 240 份'
  },
  {
    id: 'JOB-0315-206',
    module: '涡旋识别',
    queue: 'GPU-01',
    status: '运行中',
    duration: '01m 48s',
    output: '候选目标 16 个'
  },
  {
    id: 'JOB-0315-209',
    module: '多要素预测',
    queue: 'GPU-02',
    status: '已完成',
    duration: '08m 24s',
    output: '96h 预测曲线 3 组'
  },
  {
    id: 'JOB-0315-212',
    module: '风浪异常',
    queue: 'CPU-Alert',
    status: '告警已推送',
    duration: '03m 42s',
    output: '预警 3 条'
  }
]

export const exportPackages = [
  {
    name: '日报总览包',
    content: '首页截图、关键指标、最近任务、异常列表',
    format: 'ZIP'
  },
  {
    name: '答辩演示包',
    content: '5 个页面截图、核心图表、模型指标说明',
    format: 'PPTX + ZIP'
  },
  {
    name: '实验复现包',
    content: '任务日志、模型版本、结果 CSV、评估图表',
    format: 'ZIP'
  }
]

export const auditTrail = [
  '2026-03-15 15:58 数据接入任务自动校验通过。',
  '2026-03-15 15:46 异常检测模块完成规则阈值更新。',
  '2026-03-15 15:18 预测模型 hydra-tcn-v1.8 重新加载成功。',
  '2026-03-15 14:55 导出服务完成日报打包并归档。'
]
