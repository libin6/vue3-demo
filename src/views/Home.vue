<template>
  <div class="home-container">
    <header class="header">
      <h1>欢迎回来</h1>
      <button @click="handleLogout" :disabled="userStore.loading">
        {{ userStore.loading ? '登出中...' : '登出' }}
      </button>
    </header>
    
    <main class="main-content">
      <div class="user-info" v-if="userStore.user">
        <h2>用户信息</h2>
        <p><strong>邮箱：</strong>{{ userStore.user.email }}</p>
        <p><strong>姓名：</strong>{{ userStore.user.name }}</p>
      </div>
      
      <div class="server-info" v-if="serverInfo">
        <h2>服务器信息</h2>
        <pre>{{ JSON.stringify(serverInfo, null, 2) }}</pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import apiService from '../api';

const router = useRouter();
const userStore = useUserStore();
const serverInfo = ref(null);

onMounted(async () => {
  try {
    const response = await apiService.getServerInfo();
    serverInfo.value = response.data;
  } catch (error) {
    console.error('获取服务器信息失败:', error);
  }
});

const handleLogout = async () => {
  try {
    await userStore.logout();
    router.push('/login');
  } catch (error) {
    // 错误已在 store 中处理
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  color: #333;
  margin: 0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #c82333;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.user-info,
.server-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
  color: #666;
}

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9rem;
}
</style> 