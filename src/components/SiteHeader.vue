<script setup>
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

const nav = [
  { to: '/', label: '首页' },
  { to: '/posts', label: '文章' },
]

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80"
  >
    <div
      class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
    >
      <RouterLink to="/" class="flex items-center gap-2.5">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white dark:bg-indigo-500"
          >文</span
        >
        <span class="text-lg font-bold tracking-tight">我的博客</span>
      </RouterLink>

      <nav class="flex items-center gap-1 sm:gap-2">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium transition"
          :class="
            isActive(item.to)
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
          "
        >
          {{ item.label }}
        </RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
