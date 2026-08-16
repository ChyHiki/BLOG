<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
})

const formattedDate = computed(() => {
  const d = new Date(props.post.date)
  if (Number.isNaN(d.getTime())) return props.post.date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<template>
  <RouterLink
    :to="`/posts/${post.slug}`"
    class="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/40"
  >
    <div
      class="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
    >
      <time :datetime="post.date">{{ formattedDate }}</time>
      <span class="text-zinc-300 dark:text-zinc-600">·</span>
      <span>约 {{ post.readingTime }} 分钟</span>
    </div>

    <h3
      class="mt-3 text-lg font-semibold leading-snug text-zinc-900 transition group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
    >
      {{ post.title }}
    </h3>

    <p
      v-if="post.excerpt"
      class="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
    >
      {{ post.excerpt }}
    </p>

    <div v-if="post.tags.length" class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
      >
        #{{ tag }}
      </span>
    </div>
  </RouterLink>
</template>
