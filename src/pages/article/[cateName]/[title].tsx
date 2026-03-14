import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import style from '@/styles/ArticleDisplay.module.sass'
import Markdown from '@/components/Markdown'
import 'katex/dist/katex.min.css'
import { getArticle } from '@/requests/article'
import Article from '@/types/Article'
import Head from 'next/head'
import ArticleMenu from '@/components/ArticleMenu'
import dayjs from 'dayjs'
import { READING_SPEED } from '@/constants/site'
import { useReadingProgress } from '@/hooks/useEffects'

interface ArticlePageProps {
  article: Article
}

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps
> = async context => {
  const { cateName, title } = context.params || {}
  if (!cateName || !title) return { notFound: true }

  const article = await getArticle(cateName as string, title as string)
  return article ? { props: { article } } : { notFound: true }
}

/** 生成 ASCII 进度条 */
function asciiProgressBar(progress: number) {
  const total = 20
  const filled = Math.round((progress / 100) * total)
  const empty = total - filled
  const bar = '█'.repeat(filled) + '░'.repeat(empty)
  const label = progress >= 100 ? 'EOF' : `${progress}%`
  return `[${bar}] ${label}`
}

/**
 * 文章详情页
 * 展示 Markdown 正文，支持浮动操作按钮（回到顶部、打开目录）和侧滑 TOC 抽屉
 */
export default function ArticlePage({ article }: ArticlePageProps) {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([])
  const [tocVisible, setTocVisible] = useState(false)

  // 阅读进度（基于 .main 容器的滚动）
  const progress = useReadingProgress(`.${style.main}`)

  // 预估阅读时间（至少 1 分钟）
  const readingMinutes = Math.max(
    1,
    Math.floor(article.content.length / READING_SPEED),
  )

  // 页面加载后提取所有 h2 标题用于生成目录
  useEffect(() => {
    const page = document.querySelector(`.${style.page}`)
    if (page) {
      setHeadings(Array.from(page.querySelectorAll('h2')))
    }
  }, [])

  /** 平滑滚动到页面顶部 */
  const backToTop = () => {
    const main = document.querySelector(`.${style.main}`)
    main?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>{article.title} — foril</title>
        <meta name="description" content={article.description} />
      </Head>

      <div className={style.container}>
        <div className={style.main}>
          {/* ASCII 阅读进度条 */}
          <div className={style.progressBar}>
            <span className={style.progressText}>
              {asciiProgressBar(progress)}
            </span>
          </div>

          <div className={style.page}>
            {/* 文章标题和元信息 */}
            <div className={style.heading}>
              <h1 className={style.headingTitle}>{article.title}</h1>
              <div className={style.headingMeta}>
                <span className={style.metaItem}>
                  📅 {dayjs(article.time).format('YYYY-MM-DD')}
                </span>
                <span className={style.separator}>|</span>
                <span className={style.metaItem}>
                  ⏱ ~{readingMinutes} min read
                </span>
                <span className={style.separator}>|</span>
                <span className={style.metaItem}>#{article.cateName}</span>
              </div>
            </div>

            {/* Markdown 正文 */}
            <Markdown>{article.content}</Markdown>

            {/* 浮动操作按钮 */}
            <div className={style.levBox}>
              <div className={style.roundContainer} onClick={backToTop}>
                ↑
              </div>
              <div
                className={style.roundContainer}
                onClick={() => setTocVisible(true)}
              >
                ≡
              </div>
            </div>
          </div>
        </div>

        {/* TOC 抽屉遮罩层 */}
        <div
          className={`${style.tocOverlay} ${
            tocVisible ? style.tocOverlayVisible : ''
          }`}
          onClick={() => setTocVisible(false)}
        />

        {/* TOC 侧滑抽屉 */}
        <div
          className={`${style.tocDrawer} ${
            tocVisible ? style.tocDrawerVisible : ''
          }`}
        >
          <div className={style.tocHeader}>
            <span>$ tree --headings</span>
            <span
              className={style.tocClose}
              onClick={() => setTocVisible(false)}
            >
              ✕
            </span>
          </div>
          <div className={style.tocList}>
            <ArticleMenu
              headings={headings}
              afterClick={() => setTocVisible(false)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
