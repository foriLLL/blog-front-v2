import React from 'react'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/requests/articleInfo'
import { GetStaticProps } from 'next'

interface HomePageProps {
  articleInfos: ArticleInfo[]
}

// 使用 ISR：构建时生成静态页面，后台每 60s 增量更新，
// 避免从文章页返回时重新 SSR 导致的加载等待
export const getStaticProps: GetStaticProps<HomePageProps> = async () => ({
  props: { articleInfos: await getAllArticleInfos() },
  revalidate: 60,
})

/**
 * 首页
 * 展示所有文章的摘要列表
 */
export default function HomePage({ articleInfos }: HomePageProps) {
  return <PostList articleInfos={articleInfos} />
}
