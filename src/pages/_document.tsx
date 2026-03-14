import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

const MyDocument = () => (
  <Html lang="zh-CN">
    <Head />
    <body>
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
