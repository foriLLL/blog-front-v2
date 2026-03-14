import ArticleInfo from '@/types/ArticleInfo'
import React from 'react'
import style from '@/styles/components/PostItem.module.sass'
import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

interface PostItemProps {
  articleInfo: ArticleInfo
}

/**
 * 文章列表项
 * 以终端输出行的形式展示文章标题、发布时间、分类和摘要
 */
export default function PostItem({ articleInfo }: PostItemProps) {
  const articleUrl = `/article/${encodeURIComponent(
    articleInfo.cateName,
  )}/${encodeURIComponent(articleInfo.title)}`

  return (
    <div className={style.container}>
      <Link href={articleUrl}>
        <a className={style.link}>
          <div className={style.header}>
            <span className={style.prompt}>→</span>
            <span className={style.title}>{articleInfo.title}</span>
          </div>
          <div className={style.meta}>
            <span>
              {articleInfo.time === '未知'
                ? '未知'
                : dayjs(articleInfo.time).fromNow()}
            </span>
            <span className={style.tag}>#{articleInfo.cateName}</span>
          </div>
          {articleInfo.description && (
            <div className={style.description}>{articleInfo.description}</div>
          )}
        </a>
      </Link>
    </div>
  )
}
