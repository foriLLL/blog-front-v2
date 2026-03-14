import { getAllArticleInfosByCateName } from '@/requests/articleInfo'
import ArticleInfo from '@/types/ArticleInfo'
import React from 'react'
import PostList from '@/components/PostList'
import { GetServerSideProps } from 'next'

interface CatePageProps {
  articleInfos: ArticleInfo[]
  cateName: string
}

export const getServerSideProps: GetServerSideProps<
  CatePageProps
> = async context => {
  const { cateName } = context.params || {}
  if (!cateName) return { notFound: true }

  const articleInfos = await getAllArticleInfosByCateName(cateName as string)
  return {
    props: { articleInfos, cateName: cateName as string },
  }
}

/**
 * 分类文章列表页
 * 显示指定分类下的所有文章
 */
export default function CatePage({ articleInfos, cateName }: CatePageProps) {
  return <PostList articleInfos={articleInfos} cateName={cateName} />
}
