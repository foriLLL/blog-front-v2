import { getAllArticleInfosByCateId } from '@/api/articleInfoApi';
import ArticleInfo from '@/types/ArticleInfo'
import Head from 'next/head'
import React from 'react'
import PostList from '@/components/PostList';
import { GetServerSideProps, NextPage } from 'next';

interface IProps {
  articleInfos: ArticleInfo[]
}
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const cateIdStr = context.params && context.params.cateId;
  if (typeof (cateIdStr) !== 'string' || parseInt(cateIdStr)===NaN) {
    return { notFound: true }
  }else{
    const infos: ArticleInfo[] = await getAllArticleInfosByCateId(parseInt(cateIdStr))
    return {
      props:{
        articleInfos: infos
      }
    }
  }

}
const CateList: NextPage<IProps> = (props:IProps) => {

  return (
    <>
      <Head>
        <title>foriL.space { }</title>
        <meta name="description" content="foriL的个人博客" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PostList articleInfos={props.articleInfos} />
      </main>
    </>
  )
}
export default CateList;
