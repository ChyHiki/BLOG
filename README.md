# 我的博客（个人博客模板）

基于 Vue 3 + Vite + Vue Router + Tailwind CSS v4 的个人博客，支持 Markdown 渲染与暗色模式，所有组件使用 `<script setup>` 语法。

## 功能

- 🏠 **首页**：个人简介 + 最新文章
- 📚 **文章列表页**：全部文章，支持按标签筛选
- 📝 **文章详情页**：Markdown 渲染、代码高亮、标题锚点、阅读进度条、上一篇/下一篇导航
- 🌙 **暗色模式**：跟随系统偏好，可手动切换并持久化到 `localStorage`，无主题闪烁

## 快速开始

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

## 添加文章

在 `src/posts/` 目录下新建 `.md` 文件即可，文件名（不含 `.md`）就是文章 URL 中的 slug。

文章以 frontmatter 开头声明元信息：

```md
---
title: 文章标题
date: 2025-06-01
description: 文章摘要（可选，缺省时自动取正文第一段）
tags: [Vue, 前端]
---
```

正文支持：标题、列表、表格、引用、行内代码、代码块（highlight.js 自动高亮）、链接（外链新标签打开）、图片等常用 Markdown 语法。

## 目录结构

```
src/
├── components/   # 通用组件（Header / Footer / PostCard / PostContent 等）
├── composables/  # 组合式函数（usePosts / useDarkMode）
├── posts/        # Markdown 文章
├── router/       # 路由配置
├── utils/        # markdown 渲染与 frontmatter 解析
├── views/        # 页面组件（首页 / 文章列表 / 文章详情）
├── App.vue
└── main.js
```

## 技术栈

- Vue 3（`<script setup>`）
- Vite
- Vue Router 4
- Tailwind CSS v4 + `@tailwindcss/typography`
- markdown-it + highlight.js
"# BLOG" 
