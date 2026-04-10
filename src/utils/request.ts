import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  // 根据不同的环境变量设置不同的 baseURL
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8000/api/v1',
  timeout: 15000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头，例如 Token 认证
    // if (store.getters.token) { config.headers['Authorization'] = `Bearer ${token}` }
    return config;
  },
  (error) => {
    console.error('Request Error: ', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 后端返回 ResponseModel { code: 200, message: '...', data: ... }
    if (res.code && res.code !== 200) {
      console.error('API Error: ', res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      // 成功直接返回 data
      return res.data;
    }
  },
  (error) => {
    console.error('Response Error: ', error);
    return Promise.reject(error);
  }
);

export default service;
