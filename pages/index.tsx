import React from 'react';
import Head from 'next/head'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/api/articleInfoApi'

interface IState{
  articleInfos: ArticleInfo[]
}
class Home extends React.Component<{}, IState> {
  constructor(props: {}){
    super(props);
    this.state = {
      articleInfos: []
    }
  }

  async componentDidMount(){
    const articleInfos: ArticleInfo[] = await getAllArticleInfos()
    this.setState({
      articleInfos
    })
  }

  render() {
    const {articleInfos} = this.state;
    return (
      <>
        <Head>
          <title>foriL.space</title>
          <meta name="description" content="foriL的个人博客" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <PostList articleInfos={articleInfos} />
        </main>
      </>
    )
  }
}
export default Home
