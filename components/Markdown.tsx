import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import style from '@/styles/components/markdown.module.sass'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { LinkOutlined } from '@ant-design/icons';

const Markdown = (props: ReactMarkdownOptions) =>
  <div className={style.markdownContainer}>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath, remarkGfm]}
      components={{
        div({ className, children, ...props }) {
          const match = /math math-display/.exec(className || '')
          if (match) {
            return (<div className={[className, style.math].join(' ')} {...props}>
              {children}
            </div>)
          }
          return (<div className={className} {...props}>
            {children}
          </div>)
        },
        table: ({ ...props }) => (<div className={style.tableDiv}><table {...props} /></div>),
        a: ({ className, ...props }) => {
          return <a className={[style.a, className].join(' ')} {...props}></a>
        },
        img: ({ className, ...props }) => (
          <div className={style.imgDiv}><img className={[className, style.img].join(' ')} {...props} /></div>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              className={style.codeDiv}
              children={String(children).replace(/\n$/, '')}
              // @ts-ignore
              style={theme}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={[className, style.codeInline].join(' ')} {...props}>
              {children}
            </code>
          )
        },
        h2({ children, ...props }) {
          return <h2 {...props} id={children.toString()}><LinkOutlined style={{ fontSize: '0.7em' }} /> {children}</h2>
        }
      }}
      {...props} />
  </div >;

export default Markdown;
