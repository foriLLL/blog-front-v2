import { getAllArticleInfosByCateName } from '@/requests/articleInfo'
import ArticleInfo from '@/types/ArticleInfo'
import Head from 'next/head'
import React from 'react'
import PostList from '@/components/PostList'
import { GetServerSideProps, NextPage } from 'next'

interface IProps {
  articleInfos: ArticleInfo[]
}
export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const params = context.params

  if (!params || !params.cateName) {
    return { notFound: true }
  }

  const infos: ArticleInfo[] = await getAllArticleInfosByCateName(
    params.cateName as string,
  )
  return {
    props: {
      articleInfos: infos,
    },
  }
}

const CateList: NextPage<IProps> = (props: IProps) => {
  return (
    <>
      <PostList articleInfos={props.articleInfos} />
    </>
  )
}
export default CateList
