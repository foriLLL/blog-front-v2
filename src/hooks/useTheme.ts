import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'blog-theme'

/**
 * 主题切换 Hook
 *
 * 支持三种模式：light / dark / system
 * - system: 跟随系统偏好（默认）
 * - light/dark: 手动强制指定
 *
 * 持久化到 localStorage，页面刷新后恢复选择
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  // 初始化：从 localStorage 恢复用户选择
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      setThemeState(saved)
      applyTheme(saved)
    }
  }, [])

  // 应用主题到 <html> 标签
  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    if (t === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', t)
    }
  }

  // 切换主题
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    localStorage.setItem(STORAGE_KEY, t)
  }, [])

  // 循环切换: system → light → dark → system
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next =
        prev === 'system' ? 'light' : prev === 'light' ? 'dark' : 'system'
      applyTheme(next)
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  /** 当前主题的显示图标 */
  const themeIcon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'

  /** 当前主题的显示标签 */
  const themeLabel =
    theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : 'auto'

  return { theme, setTheme, toggleTheme, themeIcon, themeLabel }
}
