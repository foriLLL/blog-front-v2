import ArticleInfo from '@/types/ArticleInfo'
import React, { Component } from 'react'
import style from '@/styles/components/PostItem.module.sass'

interface IProps {
  articleInfo: ArticleInfo
}
export default class PostItem extends Component<IProps> {
  render() {
    const { articleInfo } = this.props;
    return (
      <div className={style.container}>
        <h2>{articleInfo.title}</h2>

      </div>
    )
  }
}
