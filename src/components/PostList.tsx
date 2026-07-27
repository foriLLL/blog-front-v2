import ArticleInfo from '@/types/ArticleInfo'
import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import PostItem from './PostItem'
import TypewriterText from './TypewriterText'
import style from '@/styles/components/PostList.module.sass'
import { isPopNavigation } from '@/utils/scrollMemory'

interface PostListProps {
  articleInfos: ArticleInfo[]
  /** 当前筛选的分类名（可选，用于分类页显示路径提示） */
  cateName?: string
}

const SEARCH_KEY_PREFIX = 'blog:search:'

/**
 * 文章列表组件
 * 以终端 `ls` 命令的输出形式展示文章摘要列表
 * 支持前端模糊搜索（标题 + 描述）
 */
export default function PostList({ articleInfos, cateName }: PostListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const dirPath = cateName ? `~/posts/${cateName}/` : '~/posts/'

  // 从文章页通过浏览器返回（popstate）时，恢复离开前输入的搜索关键词
  useEffect(() => {
    if (!isPopNavigation()) return
    const saved = sessionStorage.getItem(SEARCH_KEY_PREFIX + router.asPath)
    if (saved) setSearchQuery(saved)
    // 仅在挂载时恢复一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 关键词变化时持久化，供返回列表时恢复
  useEffect(() => {
    sessionStorage.setItem(SEARCH_KEY_PREFIX + router.asPath, searchQuery)
  }, [searchQuery, router.asPath])

  // 根据搜索关键词过滤文章（模糊匹配标题和描述）
  const filteredInfos = useMemo(() => {
    if (!searchQuery.trim()) return articleInfos
    const keywords = searchQuery.toLowerCase().trim().split(/\s+/)
    return articleInfos.filter(info => {
      const text =
        `${info.title} ${info.description} ${info.cateName}`.toLowerCase()
      return keywords.every(kw => text.includes(kw))
    })
  }, [articleInfos, searchQuery])

  return (
    <div className={style.container}>
      {/* 搜索命令行 */}
      <div className={style.searchLine}>
        <span className={style.prompt}>$</span>
        <span className={style.searchPrefix}>grep -r &quot;</span>
        <input
          className={style.searchInput}
          type="text"
          placeholder="搜索文章..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className={style.searchPrefix}>&quot; {dirPath}</span>
      </div>

      {/* 终端输出头（打字机效果） */}
      <div className={style.commandLine}>
        <span className={style.prompt}>$</span>{' '}
        <TypewriterText
          text={`ls -la ${dirPath} — ${filteredInfos.length}${
            searchQuery ? ` / ${articleInfos.length}` : ''
          } 篇文章`}
          speed={25}
        />
      </div>
      <div className={style.terminalOutput}>
        {`total ${filteredInfos.length}`}
      </div>

      {/* 文章列表 */}
      {filteredInfos.length > 0 ? (
        filteredInfos.map(info => (
          <PostItem key={info.title} articleInfo={info} />
        ))
      ) : (
        <div className={style.noResult}>
          <span className={style.prompt}>$</span> echo
          &quot;未找到匹配的文章&quot;
        </div>
      )}
    </div>
  )
}
