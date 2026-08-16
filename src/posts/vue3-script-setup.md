---
title: Vue 3 <script setup> 组合式 API 入门
date: 2025-02-14
description: 了解 <script setup> 语法糖与组合式 API，用更简洁的方式编写 Vue 3 组件。
tags: [Vue, 前端]
---

# Vue 3 `<script setup>` 组合式 API 入门

Vue 3 带来了全新的组合式 API（Composition API），而 `<script setup>` 则是它的语法糖，让组件代码更简洁、更直观。

## 为什么用 `<script setup>`

- 更少的样板代码：不再需要 `export default { setup() {} }`
- 顶部导入即可用：引入的组件、指令无需手动注册
- 更好的类型推断：配合 TypeScript 体验极佳

## 基本用法

一个最简单的计数器组件：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">点击了 {{ count }} 次</button>
</template>
```

## 与 Options API 的对比

| 能力 | Options API | `<script setup>` |
| ---- | ----------- | ---------------- |
| 响应式状态 | `data()` | `ref` / `reactive` |
| 计算属性 | `computed` 选项 | `computed()` 函数 |
| 侦听器 | `watch` 选项 | `watch()` 函数 |
| 生命周期 | `mounted()` | `onMounted()` |

## 接收 props 与 emit

```vue
<script setup>
const props = defineProps({
  title: { type: String, required: true },
})

const emit = defineEmits(['close'])
</script>
```

> 提示：`defineProps` 和 `defineEmits` 是编译器宏，不需要导入。

## 小结

`<script setup>` 让 Vue 3 的组件编写变得轻快，配合组合式函数（composable）可以很好地复用逻辑。这也是本站所有组件采用的方式。
