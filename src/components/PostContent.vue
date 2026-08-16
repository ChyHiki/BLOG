<script setup>
import { computed } from 'vue'
import { renderMarkdown } from '../utils/markdown'

const props = defineProps({
  content: { type: String, required: true },
})

const html = computed(() => renderMarkdown(props.content))
</script>

<template>
  <article
    class="prose prose-zinc max-w-none dark:prose-invert"
    v-html="html"
  ></article>
</template>
