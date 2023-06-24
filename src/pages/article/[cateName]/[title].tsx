import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import style from '@/styles/ArticleDisplay.module.sass'
import Markdown from '@/components/Markdown'
import 'katex/dist/katex.min.css'
import { getArticle } from '@/requests/article'
import Article from '@/types/Article'
import Head from 'next/head'
import ArticleMenu from '@/components/ArticleMenu'
import { Divider, Drawer } from 'antd'
import {
  CalendarOutlined,
  EyeOutlined,
  MenuOutlined,
  UpOutlined,
} from '@ant-design/icons'
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
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const backToTop = () => {
    const page = document.getElementsByClassName(style.page)
    page[0].scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const page = document.querySelector('.' + style.page)
    if (page !== null) {
      setHeadings(Array.from(page.querySelectorAll('h2')))
    }
  }, [])

  const { article } = props
  return (
    <>
      <Head>
        <title>foril - {article.title}</title>
        <meta name="description" content={article.description} />
      </Head>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.page}>
            <div className={style.heading} onClick={showDrawer}>
              <h1>{article.title}</h1>
              <div>
                <CalendarOutlined /> {dayjs(article.time).format('YYYY-MM-DD')}
                <Divider type="vertical" />
                <EyeOutlined /> {article.views || '-'}
              </div>
            </div>

            <Divider plain orientation="right">
              阅读时间：{Math.floor(article.content.length / 500)}分钟
            </Divider>

            <Markdown>{article?.content}</Markdown>

            <div className={style.levBox}>
              <div className={style.roundContainer} onClick={backToTop}>
                <UpOutlined />
              </div>
              <div
                className={style.roundContainer}
                onClick={() => setVisible(true)}
              >
                <MenuOutlined />
              </div>
            </div>
          </div>
        </div>
        {/* 回到顶端 */}
        <Drawer
          title="文章目录"
          placement="right"
          onClose={onClose}
          open={visible}
        >
          <ArticleMenu
            headings={headings}
            afterClick={() => {
              setVisible(false)
            }}
          />
        </Drawer>
      </div>
    </>
  )
}

export default ArticleDisplay
