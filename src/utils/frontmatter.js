/**
 * 解析 Markdown 文件头部 frontmatter（YAML 子集）。
 * 支持形如 `key: value` 的简单字段，值可为字符串、数字或 `[a, b]` 数组。
 *
 * @param {string} raw 原始 Markdown 文本
 * @returns {{ data: Record<string, unknown>, content: string }} 元数据与正文
 */
export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    if (!key) continue
    let value = line.slice(idx + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    } else if (/^\d+$/.test(value)) {
      value = Number(value)
    }

    data[key] = value
  }

  return { data, content: raw.slice(match[0].length) }
}
