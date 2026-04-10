// ==================== 1. 风浪预警 Anomaly ====================
export interface WindWaveDataPoint {
  wind_speed: number;
  wave_height: number;
}

export interface AnomalyRequest {
  recent_data: WindWaveDataPoint[];
  latitude?: number;
  longitude?: number;
  timestamp?: string; // ISO String
}

export interface AnomalyResponse {
  anomaly_probability: number;
  warning_level: string; // "NONE", "LOW", "MEDIUM", "HIGH"
  suggest_sink: boolean;
}

// ==================== 2. 海洋垃圾 CV ====================
export interface CVDetectRequest {
  image_base64: string;
}

export interface BoundingBox {
  x_min: number;
  y_min: number;
  x_max: number;
  y_max: number;
}

export interface DetectResultItem {
  label: string;
  confidence: number;
  box: BoundingBox;
}

export interface CVDetectResponse {
  results: DetectResultItem[];
}

// ==================== 3. 海洋生境预测 Forecast ====================
export interface ForecastRequest {
  latitude: number;
  longitude: number;
  timestamp: string; // ISO String
}

export interface ForecastTimeSeriesPoint {
  time: string; // ISO String
  sst: number;
  sss: number;
  flow: number;
}

export interface ForecastResponse {
  series: ForecastTimeSeriesPoint[];
}

// ==================== 4. 工单流转 WorkOrder ====================
export interface WorkOrderRequest {
  alarm_id: string;
  description?: string;
}

export interface WorkOrderResponse {
  order_id: string;
  status: string; // "PENDING", "PROCESSING", "DONE"
  created_at: string; // ISO String
}
