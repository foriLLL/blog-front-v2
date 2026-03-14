import ArticleInfo from '@/types/ArticleInfo'
import React from 'react'
import PostItem from './PostItem'
import style from '@/styles/components/PostList.module.sass'

interface IProps {
  articleInfos: ArticleInfo[]
}

export default function PostList(props: IProps) {
  const { articleInfos } = props
  return (
    <div className={style.container}>
      <div className={style.commandLine}>
        <span className={style.prompt}>$</span> ls -la ~/posts/
        <span style={{ color: 'var(--text-muted)' }}>
          {' '}
          — {articleInfos.length} 篇文章
        </span>
      </div>
      <div className={style.terminalOutput}>
        {`total ${articleInfos.length}`}
      </div>
      {articleInfos.map(info => (
        <PostItem key={info.title} articleInfo={info} />
      ))}
    </div>
  )
}
