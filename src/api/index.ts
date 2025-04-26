import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 允许跨域携带 cookie
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 获取 CSRF token
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (token) {
      config.headers['X-XSRF-TOKEN'] = token.split('=')[1];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    debugger
    return response
  },
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          // 禁止访问
          console.error('没有权限访问该资源');
          break;
        case 404:
          // 资源不存在
          console.error('请求的资源不存在');
          break;
        case 500:
          // 服务器错误
          console.error('服务器错误');
          break;
        default:
          console.error('发生错误:', response.data);
      }
    }
    return Promise.reject(error);
  }
);

// API 接口
export const apiService = {
  // 获取服务器信息
  getServerInfo: () => api.get('/'),
  
  // 获取 CSRF token
  getCsrfToken: () => api.get('/csrf-cookie'),
  
  // 登录
  login: (data: { email: string; password: string }) => 
    api.post('/login', data),
  
  // 登出
  logout: () => api.post('/logout'),
  
  // 获取用户信息
  getUserInfo: () => api.get('/api/user'),
};

export default apiService; 