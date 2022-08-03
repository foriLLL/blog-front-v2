import ArticleInfo from '@/types/ArticleInfo';
import React, { Component } from 'react';
import PostItem from './PostItem';
import style from '@/styles/components/PostList.module.sass';

interface IProps {
  articleInfos: ArticleInfo[]
}
export default class PostList extends Component<IProps> {
  render() {
    const { articleInfos } = this.props;
    return (
      <div className={style.container}>
        {articleInfos.map(info => (
          <PostItem key={info.articleId} articleInfo={info} />
        ))}
      </div>
    )
  }
}
