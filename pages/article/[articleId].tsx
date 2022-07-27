import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import style from '@/styles/ArticleDisplay.module.sass'
import Markdown from '@/components/Markdown';
import 'katex/dist/katex.min.css'
import { getArticleById } from '@/api/article';
import Article from '@/types/Article';
import Head from 'next/head';

interface IProps {
  article: Article;
}
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const articleIdStr = context.params && context.params.articleId;
  if (typeof (articleIdStr) !== 'string' || parseInt(articleIdStr) === NaN) {
    return { notFound: true }
  }
  const article: Article | undefined = await getArticleById(parseInt(articleIdStr));
  if (!!article) {
    return {
      props: {
        article
      }
    }
  } else {
    return { notFound: true }
  }
}

const ArticleDisplay: NextPage<IProps> = (props: IProps) => {
  const { article } = props;
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content="foriL的个人博客" />
      </Head>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.page}>
            <Markdown>{article?.content}</Markdown>
          </div>
        </div>
        {/* 移动端点击目录 */}
        <div className={style.menu}>
          menu
        </div>
        {/* 回到顶端 */}
      </div>
    </>
  );
}

export default ArticleDisplay;
