import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import style from '@/styles/components/markdown.module.sass'

const Markdown = (props: ReactMarkdownOptions) =>
  <ReactMarkdown
    rehypePlugins={[rehypeRaw, rehypeKatex]}
    remarkPlugins={[remarkMath]}
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
      }
    }}
    {...props}
  />;

export default Markdown;
