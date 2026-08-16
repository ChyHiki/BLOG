<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)

function onScroll() {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  progress.value =
    total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-50 h-0.5">
    <div
      class="h-full bg-indigo-500 transition-[width] duration-150 ease-out dark:bg-indigo-400"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
