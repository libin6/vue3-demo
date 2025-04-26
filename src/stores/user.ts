import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiService from '../api';
import type { AxiosError } from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
}

interface ApiError {
  message: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 登录
  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;
      
      // 先获取 CSRF token
      await apiService.getCsrfToken();
      
      // 执行登录
      const response = await apiService.login({ email, password });
      user.value = response.data;
      isAuthenticated.value = true;
      
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      error.value = axiosError.response?.data?.message || '登录失败';
      throw axiosError;
    } finally {
      loading.value = false;
    }
  };

  // 登出
  const logout = async () => {
    try {
      loading.value = true;
      await apiService.logout();
      user.value = null;
      isAuthenticated.value = false;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      error.value = axiosError.response?.data?.message || '登出失败';
      throw axiosError;
    } finally {
      loading.value = false;
    }
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await apiService.getUserInfo();
      user.value = response.data;
      isAuthenticated.value = true;
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      error.value = axiosError.response?.data?.message || '获取用户信息失败';
      throw axiosError;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    fetchUserInfo,
  };
}); 