import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

/**
 * 在 <body> 加载前执行的内联脚本
 * 从 localStorage 读取主题偏好并立即应用到 <html>，避免首屏闪白/闪黑
 */
const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var t = localStorage.getItem('blog-theme');
            if (t === 'dark' || t === 'light') {
              document.documentElement.setAttribute('data-theme', t);
            }
          } catch(e) {}
        })();
      `,
    }}
  />
)

const MyDocument = () => (
  <Html lang="zh-CN">
    <Head />
    <body>
      <ThemeScript />
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}

export default MyDocument
