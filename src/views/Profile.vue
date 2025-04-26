<template>
  <div class="profile-container">
    <header class="header">
      <h1>个人资料</h1>
      <router-link to="/" class="back-link">返回首页</router-link>
    </header>
    
    <main class="main-content">
      <div class="profile-card" v-if="userStore.user">
        <div class="profile-header">
          <h2>基本信息</h2>
        </div>
        
        <div class="profile-body">
          <div class="info-item">
            <label>用户 ID</label>
            <span>{{ userStore.user.id }}</span>
          </div>
          
          <div class="info-item">
            <label>邮箱</label>
            <span>{{ userStore.user.email }}</span>
          </div>
          
          <div class="info-item">
            <label>姓名</label>
            <span>{{ userStore.user.name }}</span>
          </div>
        </div>
      </div>
      
      <div class="loading" v-else-if="userStore.loading">
        加载中...
      </div>
      
      <div class="error" v-else-if="userStore.error">
        {{ userStore.error }}
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.user) {
    try {
      await userStore.fetchUserInfo();
    } catch (error) {
      // 错误已在 store 中处理
    }
  }
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
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

.back-link {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.main-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.profile-header h2 {
  margin: 0;
  color: #333;
}

.profile-body {
  padding: 1.5rem;
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-item label {
  width: 100px;
  color: #666;
  font-weight: 500;
}

.info-item span {
  flex: 1;
  color: #333;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}
</style> 