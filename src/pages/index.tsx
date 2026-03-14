import React from 'react'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/requests/articleInfo'
import { GetServerSideProps } from 'next'

interface HomePageProps {
  articleInfos: ArticleInfo[]
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => ({
  props: { articleInfos: await getAllArticleInfos() },
})

/**
 * 首页
 * 展示所有文章的摘要列表
 */
export default function HomePage({ articleInfos }: HomePageProps) {
  return <PostList articleInfos={articleInfos} />
}
