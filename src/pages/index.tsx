import React from 'react'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/requests/articleInfo'
import { GetServerSideProps } from 'next'

interface IProps {
  articleInfos: ArticleInfo[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const articleInfos = await getAllArticleInfos()
  return {
    props: {
      articleInfos,
    },
  }
}

export default function Home(props: IProps) {
  const { articleInfos } = props
  return <PostList articleInfos={articleInfos} />
}
