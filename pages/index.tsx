import React from 'react'
import PostList from '@/components/PostList'
import ArticleInfo from '@/types/ArticleInfo'
import { getAllArticleInfos } from '@/api/articleInfoApi'
import { GetServerSideProps } from 'next'

interface IProps {
  articleInfos: ArticleInfo[]
}
export const getServerSideProps: GetServerSideProps = async context => {
  const articleInfos = await getAllArticleInfos()
  return {
    props: {
      articleInfos,
    },
  }
}
class Home extends React.Component<IProps> {
  render() {
    const { articleInfos } = this.props
    return <PostList articleInfos={articleInfos} />
  }
}
export default Home
