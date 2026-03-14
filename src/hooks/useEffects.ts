import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * 打字机效果 Hook
 * 逐字显示文本，带可配置速度和完成回调
 */
export function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    setDisplayed('')
    setIsDone(false)
    indexRef.current = 0

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        setIsDone(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayed, isDone }
}

/**
 * 阅读进度 Hook
 * 基于滚动容器计算当前阅读百分比
 */
export function useReadingProgress(containerSelector: string) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const maxScroll = scrollHeight - clientHeight
      if (maxScroll <= 0) {
        setProgress(100)
        return
      }
      setProgress(Math.min(100, Math.round((scrollTop / maxScroll) * 100)))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerSelector])

  return progress
}
