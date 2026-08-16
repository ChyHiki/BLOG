---
title: 用 Vite + Tailwind CSS 快速搭建前端项目
date: 2025-03-08
description: Vite 让开发服务器快到起飞，Tailwind CSS v4 让样式编写如虎添翼。本文记录两者的配置要点。
tags: [Vite, Tailwind CSS, 前端]
---

# 用 Vite + Tailwind CSS 快速搭建前端项目

## 初始化项目

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install
```

## 安装 Tailwind CSS v4

Tailwind CSS v4 提供了官方的 Vite 插件，配置非常简单：

```bash
npm install tailwindcss @tailwindcss/vite
```

然后在 `vite.config.js` 中注册插件：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

最后在 CSS 入口文件里写一行即可：

```css
@import "tailwindcss";
```

## 暗色模式

v4 中通过自定义 variant 开启基于 class 的暗色模式：

```css
@custom-variant dark (&:where(.dark, .dark *));
```

在 `<html>` 上切换 `.dark` 类即可：

```js
document.documentElement.classList.toggle('dark', isDark)
```

## 常用命令

| 命令 | 作用 |
| ---- | ---- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览构建产物 |

## 小结

Vite 负责快的部分，Tailwind 负责美的部分，两者配合起来非常顺手。
