import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import styles from '@/styles/components/markdown.module.sass'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { LinkOutlined } from '@ant-design/icons'

const Markdown = (props: ReactMarkdownOptions) => (
  <div className={styles.markdownContainer}>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath, remarkGfm]}
      components={{
        iframe({ style, ...props }) {
          return (
            <iframe
              style={Object.assign({}, style, { maxWidth: '100%' })}
              {...props}
            />
          )
        },
        div({ className, children, ...props }) {
          const match = /math math-display/.exec(className || '')
          if (match) {
            return (
              <div className={[className, styles.math].join(' ')} {...props}>
                {children}
              </div>
            )
          }
          return (
            <div className={className} {...props}>
              {children}
            </div>
          )
        },
        table: ({ ...props }) => (
          <div className={styles.tableDiv}>
            <table {...props} />
          </div>
        ),
        a: ({ className, ...props }) => {
          return <a className={[styles.a, className].join(' ')} {...props}></a>
        },
        img: ({ style, alt, node, ...props }) => {
          return (
            <img
              {...props}
              alt={alt}
              style={Object.assign(
                { maxWidth: '100%' },
                style,
                style === undefined ||
                  (style.margin === undefined &&
                    style.marginBottom === undefined &&
                    style.marginTop === undefined &&
                    style.marginLeft === undefined &&
                    style.marginRight === undefined)
                  ? {
                      marginBottom: '16px',
                      marginTop: '16px',
                    }
                  : {},
                style === undefined || style.display === undefined
                  ? { display: 'block' }
                  : {},
              )}
            />
          )
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              className={styles.codeDiv}
              // @ts-ignore
              style={theme}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={[className, styles.codeInline].join(' ')}
              {...props}
            >
              {children}
            </code>
          )
        },
        h2({ children, ...props }) {
          return (
            <h2 {...props} id={children.toString()}>
              <LinkOutlined style={{ fontSize: '0.7em' }} /> {children}
            </h2>
          )
        },
      }}
      {...props}
    />
  </div>
)

export default Markdown
