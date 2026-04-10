import request from '@/utils/request';
import {
  AnomalyRequest, AnomalyResponse,
  CVDetectRequest, CVDetectResponse,
  ForecastRequest, ForecastResponse,
  WorkOrderRequest, WorkOrderResponse,
  NcDataRequest, NcDataResponse
} from './types';

/**
 * 1. 风浪预警 API
 * 传入近期的风与海浪数据，进行异常分析与评估。
 */
export const detectWindWaveAnomaly = (data: AnomalyRequest): Promise<AnomalyResponse> => {
  return request({
    url: '/anomaly/wind_wave',
    method: 'post',
    data
  }) as unknown as Promise<AnomalyResponse>;
};

/**
 * 2. 海洋垃圾识别 API
 * 传入包含图片或视频帧Base64信息的请求结构，返回识别到的目标。
 */
export const detectTrash = (data: CVDetectRequest): Promise<CVDetectResponse> => {
  return request({
    url: '/cv/detect_trash',
    method: 'post',
    data
  }) as unknown as Promise<CVDetectResponse>;
};

/**
 * 3. 海洋生境预测 API
 * 传入当前经纬度和时间，返回未来 72 小时的生境数据。
 */
export const habitatForecast = (data: ForecastRequest): Promise<ForecastResponse> => {
  return request({
    url: '/forecast/habitat',
    method: 'post',
    data
  }) as unknown as Promise<ForecastResponse>;
};

/**
 * 4. 工单流转 API
 * 在系统检测到异常情况触发预警后，创建工单任务。
 */
export const createWorkOrder = (data: WorkOrderRequest): Promise<WorkOrderResponse> => {
  return request({
    url: '/workorder/create',
    method: 'post',
    data
  }) as unknown as Promise<WorkOrderResponse>;
};


/**
 * 5. 解析真实NC文件数据 API
 * 提供给操纵台提取基于真实NC文件返回的数据展示在前端。
 */
export const getNcExtractData = (params: NcDataRequest): Promise<NcDataResponse> => {
  return request({
    url: '/data/nc_extract',
    method: 'get',
    params
  }) as unknown as Promise<NcDataResponse>;
};
