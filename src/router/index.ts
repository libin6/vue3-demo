import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  
  // 如果需要认证
  if (to.meta.requiresAuth) {
    // 如果未登录，重定向到登录页
    if (!userStore.isAuthenticated) {
      next({ name: 'login' });
      return;
    }
    
    // 如果已登录但没有用户信息，获取用户信息
    if (!userStore.user) {
      try {
        await userStore.fetchUserInfo();
      } catch (error) {
        next({ name: 'login' });
        return;
      }
    }
  }
  
  // 如果已登录且访问登录页，重定向到首页
  if (to.name === 'login' && userStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }
  
  next();
});

export default router; 