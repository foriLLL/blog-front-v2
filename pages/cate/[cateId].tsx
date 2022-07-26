import { getAllArticleInfosByCateId } from '@/api/articleInfoApi';
import ArticleInfo from '@/types/ArticleInfo'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import PostList from '@/components/PostList';
import { NextPage } from 'next';

const CateList: NextPage = () => {
  const [articleInfos, setArticleInfos] = useState<ArticleInfo[]>([]);
  const router = useRouter();
  const { cateId } = router.query;
  useEffect(() => {
    if (!cateId) return;
    
    getAllArticleInfosByCateId(cateId as string).then(data => {
      setArticleInfos(data)
    });
  }, [cateId])

  return (
    <>
      <Head>
        <title>foriL.space { }</title>
        <meta name="description" content="foriL的个人博客" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PostList articleInfos={articleInfos} />
      </main>
    </>
  )
}
export default CateList;
