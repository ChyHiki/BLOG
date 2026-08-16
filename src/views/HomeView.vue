<script setup>
import { computed } from 'vue'
import { usePosts } from '../composables/usePosts'
import PostCard from '../components/PostCard.vue'

const { posts } = usePosts()

const recentPosts = computed(() => posts.value.slice(0, 3))
const tagCount = computed(
  () => new Set(posts.value.flatMap((p) => p.tags)).size
)
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6">
    <!-- Hero -->
    <section class="py-16 sm:py-24">
      <div class="max-w-2xl">
        <p
          class="text-sm font-medium text-indigo-600 dark:text-indigo-400"
        >
          你好，欢迎来访 👋
        </p>
        <h1
          class="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl"
        >
          记录技术笔记，<br class="hidden sm:block" />分享生活随想。
        </h1>
        <p
          class="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          这里是我的个人博客，使用 Vue 3、Vite 与 Tailwind CSS 构建，文章以
          Markdown 书写，支持暗色模式。
        </p>
        <div
          class="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          <span
            class="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800"
            >{{ posts.length }} 篇文章</span
          >
          <span
            class="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800"
            >{{ tagCount }} 个标签</span
          >
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="pb-16 sm:pb-24">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold tracking-tight">最新文章</h2>
        <RouterLink
          to="/posts"
          class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          查看全部 →
        </RouterLink>
      </div>

      <div
        v-if="recentPosts.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <PostCard
          v-for="post in recentPosts"
          :key="post.slug"
          :post="post"
        />
      </div>
      <p v-else class="text-sm text-zinc-500">
        还没有文章，快去 <code>src/posts/</code> 目录添加吧。
      </p>
    </section>
  </div>
</template>
