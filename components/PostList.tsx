import { getAllArticleInfos } from '@/api/articleInfoApi';
import ArticleInfo from '@/types/ArticleInfo';
import React, { Component } from 'react';
import PostItem from './PostItem';
import style from '@/styles/components/PostList.module.sass';
interface IState {
  articleInfos: ArticleInfo[]
}
export default class PostList extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articleInfos: []
    }
  }

  async componentDidMount() {
    const articleInfos: ArticleInfo[] = await getAllArticleInfos()
    console.log(articleInfos);
    this.setState({
      articleInfos
    })
  }

  render() {
    const { articleInfos } = this.state;
    return (
      <div className={style.container}>{articleInfos.map(info => (<PostItem key={info.articleId} articleInfo={info} />))}</div>
    )
  }
}
