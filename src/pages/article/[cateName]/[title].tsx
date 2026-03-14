import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import style from '@/styles/ArticleDisplay.module.sass'
import Markdown from '@/components/Markdown'
import 'katex/dist/katex.min.css'
import { getArticle } from '@/requests/article'
import Article from '@/types/Article'
import Head from 'next/head'
import ArticleMenu from '@/components/ArticleMenu'
import dayjs from 'dayjs'

interface IProps {
  article: Article
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const params = context.params

  if (!params || !params.cateName || !params.title) {
    return { notFound: true }
  }

  const article = await getArticle(
    params.cateName as string,
    params.title as string,
  )

  if (!!article) {
    return {
      props: {
        article,
      },
    }
  } else {
    return { notFound: true }
  }
}

const ArticleDisplay: NextPage<IProps> = (props: IProps) => {
  const [headings, setHeadings] = useState<Array<HTMLHeadingElement>>([])
  const [tocVisible, setTocVisible] = useState(false)

  const backToTop = () => {
    const page = document.getElementsByClassName(style.page)
    if (page[0]) {
      page[0].scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const page = document.querySelector('.' + style.page)
    if (page !== null) {
      setHeadings(Array.from(page.querySelectorAll('h2')))
    }
  }, [])

  const { article } = props
  const readingMinutes = Math.max(1, Math.floor(article.content.length / 500))

  return (
    <>
      <Head>
        <title>{article.title} — foril</title>
        <meta name="description" content={article.description} />
      </Head>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.page}>
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

            <Markdown>{article?.content}</Markdown>

            {/* Floating action buttons */}
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

        {/* TOC Drawer - replaces Ant Design Drawer */}
        <div
          className={`${style.tocOverlay} ${
            tocVisible ? style.tocOverlayVisible : ''
          }`}
          onClick={() => setTocVisible(false)}
        />
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

export default ArticleDisplay
