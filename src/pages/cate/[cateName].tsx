import { getAllArticleInfosByCateName } from '@/requests/articleInfo'
import ArticleInfo from '@/types/ArticleInfo'
import React from 'react'
import PostList from '@/components/PostList'
import { GetStaticPaths, GetStaticProps } from 'next'

interface CatePageProps {
  articleInfos: ArticleInfo[]
  cateName: string
}

// 分类页不预渲染具体路径，首个访问者触发按需生成（blocking），之后走缓存
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<CatePageProps> = async context => {
  const { cateName } = context.params || {}
  if (!cateName) return { notFound: true }

  const articleInfos = await getAllArticleInfosByCateName(cateName as string)
  return {
    props: { articleInfos, cateName: cateName as string },
    revalidate: 60,
  }
}

/**
 * 分类文章列表页
 * 显示指定分类下的所有文章
 */
export default function CatePage({ articleInfos, cateName }: CatePageProps) {
  return <PostList articleInfos={articleInfos} cateName={cateName} />
}
