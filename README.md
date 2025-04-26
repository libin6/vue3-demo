# Vue3 API Demo

这是一个使用 Vue3 + TypeScript + Vite 构建的 API 演示项目，展示了如何与 RESTful API 进行交互。

## 功能特点

- 使用 Vue3 + TypeScript + Vite 构建
- 使用 Pinia 进行状态管理
- 使用 Vue Router 进行路由管理
- 支持 CSRF 保护
- 响应式设计
- 优雅的错误处理
- 支持多环境部署

## 开发环境设置

1. 克隆项目
```bash
git clone <repository-url>
cd vue3-demo
```

2. 安装依赖
```bash
npm install
```

3. 创建环境变量文件
```bash
# .env.development
VITE_API_BASE_URL=https://dev.178778.xyz
```

4. 启动开发服务器
```bash
npm run dev
```

## 构建部署

1. 构建项目
```bash
npm run build
```

2. 预览构建结果
```bash
npm run preview
```

## 部署到 GitHub Pages

1. 在 GitHub 仓库设置中添加以下 Secrets：
   - `VITE_API_BASE_URL`: API 基础 URL

2. 推送代码到 main 分支，GitHub Actions 将自动部署到 GitHub Pages

## 项目结构

```
src/
  ├── api/          # API 服务层
  ├── stores/       # Pinia 状态管理
  ├── router/       # 路由配置
  ├── views/        # 页面组件
  └── App.vue       # 根组件
```

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Axios
- GitHub Actions
- GitHub Pages

## 许可证

MIT
