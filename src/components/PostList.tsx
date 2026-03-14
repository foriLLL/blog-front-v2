import ArticleInfo from '@/types/ArticleInfo'
import React from 'react'
import PostItem from './PostItem'
import style from '@/styles/components/PostList.module.sass'

interface PostListProps {
  articleInfos: ArticleInfo[]
  /** 当前筛选的分类名（可选，用于分类页显示路径提示） */
  cateName?: string
}

/**
 * 文章列表组件
 * 以终端 `ls` 命令的输出形式展示文章摘要列表
 */
export default function PostList({ articleInfos, cateName }: PostListProps) {
  const dirPath = cateName ? `~/posts/${cateName}/` : '~/posts/'

  return (
    <div className={style.container}>
      <div className={style.commandLine}>
        <span className={style.prompt}>$</span> ls -la {dirPath}
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
