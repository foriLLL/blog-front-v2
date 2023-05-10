import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import style from '@/styles/ArticleDisplay.module.sass'
import Markdown from '@/components/Markdown';
import 'katex/dist/katex.min.css'
import { getArticleById } from '@/api/article';
import Article from '@/types/Article';
import Head from 'next/head';
import Menu from '@/components/Menu';
import { Divider, Drawer } from 'antd';
import { CalendarOutlined, EyeOutlined, MenuOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface IProps {
  article: Article;
}
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const articleIdStr = context.params && context.params.articleId;
  if (typeof (articleIdStr) !== 'string' || Number.isNaN(parseInt(articleIdStr))) {
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
  const [headings, setHeadings] = useState<Array<HTMLHeadingElement>>([]);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const backToTop = () => {
    const page = document.getElementsByClassName(style.page);
    page[0].scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const page = document.querySelector('.' + style.page);
    if (page !== null) {
      setHeadings(Array.from(page.querySelectorAll('h2')));
    }
  }, [])

  const { article } = props;
  return (
    <>
      <Head>
        <title>foril - {article.title}</title>
        <meta name="description" content="foriL的个人博客" />
      </Head>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.page}>
            <div className={style.heading} onClick={showDrawer}>
              <h1>{article.title}</h1>
              <div>
                <CalendarOutlined /> {dayjs(article.time).format('YYYY-MM-DD')}
                <Divider type='vertical' />
                <EyeOutlined /> {article.views}
              </div>
            </div>
            <Divider plain orientation="right"  >阅读时间：{Math.floor(article.content.length / 500)}分钟</Divider>
            <Markdown>{article?.content}</Markdown>
            <div className={style.levBox}>
              <div className={style.backToTop} onClick={backToTop}><UpOutlined /></div>
              <div className={style.menu} onClick={() => setVisible(true)}><MenuOutlined /></div>
            </div>
          </div>
        </div>
        {/* 回到顶端 */}
        <Drawer title="目录" placement="right" onClose={onClose} visible={visible}>
          <Menu headings={headings} afterClick={() => { setVisible(false) }} />
        </Drawer>
      </div>
    </>
  );
}

export default ArticleDisplay;
