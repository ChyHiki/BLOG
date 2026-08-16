<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts'
import PostContent from '../components/PostContent.vue'
import ReadingProgress from '../components/ReadingProgress.vue'

const route = useRoute()
const { posts, getPost } = usePosts()

const post = computed(() => getPost(route.params.slug))
const currentIndex = computed(() =>
  posts.value.findIndex((p) => p.slug === route.params.slug)
)
// posts 按日期倒序：上一篇 = 更新的文章，下一篇 = 更旧的文章
const prevPost = computed(() =>
  currentIndex.value > 0 ? posts.value[currentIndex.value - 1] : null
)
const nextPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < posts.value.length - 1
    ? posts.value[currentIndex.value + 1]
    : null
)

const formattedDate = computed(() => {
  if (!post.value) return ''
  const d = new Date(post.value.date)
  if (Number.isNaN(d.getTime())) return post.value.date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

watch(
  post,
  (p) => {
    document.title = p
      ? `${p.title} · 我的博客`
      : '文章未找到 · 我的博客'
  },
  { immediate: true }
)
</script>

<template>
  <ReadingProgress v-if="post" />

  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
    <template v-if="post">
      <RouterLink
        to="/posts"
        class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← 返回文章列表
      </RouterLink>

      <article class="mt-6">
        <header>
          <h1
            class="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            {{ post.title }}
          </h1>
          <div
            class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <time :datetime="post.date">{{ formattedDate }}</time>
            <span>约 {{ post.readingTime }} 分钟读完</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </header>

        <PostContent class="mt-8" :content="post.content" />

        <!-- 上一篇 / 下一篇 -->
        <footer
          class="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <RouterLink
              v-if="prevPost"
              :to="`/posts/${prevPost.slug}`"
              class="group max-w-full sm:max-w-[45%]"
            >
              <span
                class="block text-xs text-zinc-400 dark:text-zinc-500"
                >上一篇</span
              >
              <span
                class="mt-1 block truncate text-sm font-medium text-zinc-700 group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400"
                >{{ prevPost.title }}</span
              >
            </RouterLink>
            <span v-else></span>

            <RouterLink
              v-if="nextPost"
              :to="`/posts/${nextPost.slug}`"
              class="group max-w-full text-right sm:ml-auto sm:max-w-[45%]"
            >
              <span
                class="block text-xs text-zinc-400 dark:text-zinc-500"
                >下一篇</span
              >
              <span
                class="mt-1 block truncate text-sm font-medium text-zinc-700 group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400"
                >{{ nextPost.title }}</span
              >
            </RouterLink>
          </div>
        </footer>
      </article>
    </template>

    <!-- 404 -->
    <div v-else class="py-20 text-center">
      <h1 class="text-2xl font-bold">文章未找到</h1>
      <p class="mt-3 text-sm text-zinc-500">
        你访问的文章不存在或已被移除。
      </p>
      <RouterLink
        to="/posts"
        class="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
      >
        返回文章列表
      </RouterLink>
    </div>
  </div>
</template>
