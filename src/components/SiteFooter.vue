<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-200 py-8 dark:border-zinc-800">
    <div
      class="mx-auto max-w-5xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6"
    >
      <p>© {{ year }} 我的博客 · 用 Vue 3 + Vite 构建</p>
    </div>
  </footer>
</template>
