---
title: 暗色模式设计实践
date: 2025-05-30
description: 从配色、对比度到实现方案，聊聊如何为网站设计一套舒适的暗色模式。
tags: [设计, CSS, 前端]
---

# 暗色模式设计实践

暗色模式不只是「反色」，它需要重新设计对比度、层次与情绪。

## 基本原则

1. **避免纯黑**：使用 `#0d1117`、`#18181b` 这类带一点色调的深灰，减少眩光
2. **控制对比度**：正文与背景对比度保持在 4.5:1 以上
3. **保留品牌色**：主色提亮一档，例如 `indigo-600` → `indigo-400`
4. **尊重用户偏好**：默认跟随 `prefers-color-scheme`

## 实现要点

以 Tailwind CSS 为例，用 class 策略控制：

```css
@custom-variant dark (&:where(.dark, .dark *));
```

切换逻辑放在一个组合式函数里，并持久化到 `localStorage`：

```js
const isDark = ref(false)

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
```

同时记得给 `<html>` 设置 `color-scheme`，让滚动条等原生控件也跟随：

```css
:root { color-scheme: light; }
.dark { color-scheme: dark; }
```

## 细节清单

- [x] 图片添加轻微降暗（`opacity-90`）
- [x] 阴影在暗色下减弱，改用边框区分层级
- [x] 代码块使用暗色专属配色
- [x] 防止主题闪烁：在 `index.html` 内联脚本提前设置 class

## 小结

好的暗色模式是「设计出来的」，而不是「反转出来的」。多用深灰、少用纯黑，细节到位后整体质感会提升很多。
