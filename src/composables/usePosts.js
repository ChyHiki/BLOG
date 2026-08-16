import { computed } from 'vue'
import { parseFrontmatter } from '../utils/frontmatter'

// 静态导入 src/posts/ 下所有 Markdown 文件（构建时内联）
const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** 粗略去掉行内 Markdown 标记，用于生成摘要 */
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~-]/g, '')
    .trim()
}

/** 取正文第一段作为摘要 */
function buildExcerpt(content) {
  for (const line of content.split(/\r?\n/)) {
    const text = stripMarkdown(line)
    if (text.length > 0) {
      return text.length > 120 ? `${text.slice(0, 120)}…` : text
    }
  }
  return ''
}

/** 按正文长度估算阅读时长（分钟） */
function readingTime(content) {
  return Math.max(1, Math.round(content.length / 400))
}

export function usePosts() {
  /** 所有文章，按日期倒序 */
  const posts = computed(() => {
    const list = Object.entries(modules).map(([path, raw]) => {
      const slug = path.split('/').pop().replace(/\.md$/, '')
      const { data, content } = parseFrontmatter(raw)
      const tags = Array.isArray(data.tags)
        ? data.tags
        : data.tags
          ? [data.tags]
          : []
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        tags,
        content,
        excerpt: data.description || buildExcerpt(content),
        readingTime: readingTime(content),
      }
    })
    return list.sort((a, b) => (a.date < b.date ? 1 : -1))
  })

  function getPost(slug) {
    return posts.value.find((p) => p.slug === slug)
  }

  return { posts, getPost }
}
