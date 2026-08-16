<script setup>
import { ref, computed } from 'vue'
import { usePosts } from '../composables/usePosts'
import PostCard from '../components/PostCard.vue'

const { posts } = usePosts()

const activeTag = ref('全部')

const tags = computed(() => [
  '全部',
  ...new Set(posts.value.flatMap((p) => p.tags)),
])

const filteredPosts = computed(() =>
  activeTag.value === '全部'
    ? posts.value
    : posts.value.filter((p) => p.tags.includes(activeTag.value))
)
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">全部文章</h1>
      <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        共 {{ posts.length }} 篇文章，按时间倒序排列
      </p>
    </header>

    <!-- 标签筛选 -->
    <div class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition"
        :class="
          activeTag === tag
            ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
        "
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div
      v-if="filteredPosts.length"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard
        v-for="post in filteredPosts"
        :key="post.slug"
        :post="post"
      />
    </div>
    <p v-else class="text-sm text-zinc-500">该标签下暂无文章。</p>
  </div>
</template>
