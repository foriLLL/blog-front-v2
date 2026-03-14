import React from 'react'
import { useTypewriter } from '@/hooks/useEffects'

interface TypewriterTextProps {
  text: string
  speed?: number
}

/**
 * 打字机文字组件
 * 逐字显示文本，末尾带闪烁光标
 */
export default function TypewriterText({
  text,
  speed = 30,
}: TypewriterTextProps) {
  const { displayed, isDone } = useTypewriter(text, speed)

  return (
    <span>
      {displayed}
      {!isDone && <span className="terminal-cursor" />}
    </span>
  )
}
