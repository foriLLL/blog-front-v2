import React, { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import styles from '@/styles/components/markdown.module.sass'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula as draculaTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'

/**
 * 代码块复制按钮组件
 * 点击后复制代码到剪贴板，显示 ✓ copied 反馈
 */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  return (
    <button className={styles.copyBtn} onClick={handleCopy} title="复制代码">
      {copied ? '✓ copied' : '[copy]'}
    </button>
  )
}

/**
 * Markdown 渲染组件
 * 支持 GFM、数学公式 (KaTeX)、代码高亮 (Dracula 主题)、复制按钮、iframe 嵌入等
 */
const Markdown = (props: ReactMarkdownOptions) => (
  <div className={styles.markdownContainer}>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, [rehypeKatex, { strict: false }]]}
      remarkPlugins={[remarkMath, remarkGfm]}
      components={{
        // iframe 自适应 16:9 宽高比
        iframe({ style, ...rest }) {
          return (
            <iframe
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                maxWidth: '100%',
                ...style,
              }}
              {...rest}
            />
          )
        },

        // 数学公式块增加横向滚动
        div({ className, children, ...rest }) {
          const isMathBlock = /math math-display/.test(className || '')
          return (
            <div
              className={
                isMathBlock ? `${className} ${styles.math}` : className
              }
              {...rest}
            >
              {children}
            </div>
          )
        },

        // 表格外包裹容器支持横向滚动
        table: ({ ...rest }) => (
          <div className={styles.tableDiv}>
            <table {...rest} />
          </div>
        ),

        // 链接统一样式
        a: ({ className, ...rest }) => (
          <a className={`${styles.a} ${className || ''}`} {...rest} />
        ),

        // 图片默认居中、限制最大宽度，支持行内 style 覆盖
        img: ({ src, alt, style, ...rest }) => (
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '100%',
              display: 'block',
              marginTop: '16px',
              marginBottom: '16px',
              ...style,
            }}
            {...rest}
          />
        ),

        // 代码块：行内用 <code>，块级用 SyntaxHighlighter + 复制按钮
        code({ inline, className, children, ...rest }) {
          const lang = /language-(\w+)/.exec(className || '')?.[1]
          const codeString = String(children).replace(/\n$/, '')

          return inline ? (
            <code
              className={`${className || ''} ${styles.codeInline}`}
              {...rest}
            >
              {children}
            </code>
          ) : (
            <div className={styles.codeBlockWrapper}>
              {/* 代码块头部：语言标签 + 复制按钮 */}
              <div className={styles.codeBlockHeader}>
                <span className={styles.codeLang}>{lang || 'code'}</span>
                <CopyButton code={codeString} />
              </div>
              <SyntaxHighlighter
                className={styles.codeDiv}
                // @ts-ignore — style 类型不兼容但功能正常
                style={draculaTheme}
                language={lang || ''}
                PreTag="div"
                {...rest}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
        },

        // h2 标题前加 '##' 装饰，生成锚点 id
        h2({ children, ...rest }) {
          return (
            <h2 {...rest} id={String(children)}>
              <span style={{ color: 'var(--text-accent)', marginRight: '8px' }}>
                ##
              </span>
              {children}
            </h2>
          )
        },
      }}
      {...props}
    />
  </div>
)

export default Markdown
