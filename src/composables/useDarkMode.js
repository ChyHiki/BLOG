import { ref } from 'vue'

const isDark = ref(false)

/** 在应用挂载前调用，从 <html> 上同步当前主题状态 */
export function initTheme() {
  isDark.value = document.documentElement.classList.contains('dark')
}

/** 主题切换：单例状态，Header 等处共享 */
export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch {
      /* 忽略隐私模式下可能抛出的异常 */
    }
  }

  return { isDark, toggle }
}
