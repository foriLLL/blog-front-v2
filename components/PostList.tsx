import ArticleInfo from '@/types/ArticleInfo';
import React, { Component } from 'react';
import PostItem from './PostItem';
import style from '@/styles/components/PostList.module.sass';
import { List } from 'antd';

interface IProps {
  articleInfos: ArticleInfo[]
}
export default class PostList extends Component<IProps> {
  render() {
    const { articleInfos } = this.props;
    return (
      <div className={style.container}>
        <List dataSource={articleInfos}
          renderItem={item => (<PostItem key={item.articleId} articleInfo={item} />)}
        >
        </List >
      </div>
    )
  }
}
