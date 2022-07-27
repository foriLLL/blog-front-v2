import React from 'react';
import Head from 'next/head'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/api/articleInfoApi'
import { GetServerSideProps } from 'next';
import style from '@/styles/Home.module.sass'

interface IProps {
  articleInfos: ArticleInfo[]
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const articleInfos = await getAllArticleInfos();
  return {
    props: {
      articleInfos
    }
  }
}
class Home extends React.Component<IProps> {
  render() {
    const { articleInfos } = this.props;
    return (
      <>
        <Head>
          <title>foriL.space</title>
          <meta name="description" content="foriL的个人博客" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={style.container}>
          <PostList articleInfos={articleInfos} />
        </main>
      </>
    )
  }
}
export default Home
