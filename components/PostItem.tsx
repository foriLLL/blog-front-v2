import ArticleInfo from '@/types/ArticleInfo'
import React, { Component } from 'react'
import style from '@/styles/components/PostItem.module.sass'
import { Divider, Tag } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn')
dayjs.extend(relativeTime);

interface IProps {
  articleInfo: ArticleInfo
}
export default class PostItem extends Component<IProps> {
  render() {
    const { articleInfo } = this.props;
    return (
      <div className={style.container}>
        <h2>{articleInfo.title}</h2>
        <Divider style={{ margin: '4px 0' }} />
        {/* <Markdown></Markdown> */}
        <div className={style.middle}>
          {articleInfo.coverImg && articleInfo.coverImg !== '' &&
            <img className={style.coverImg} src={articleInfo.coverImg} />
          }
          <div className={style.description}>{articleInfo.description}</div>
        </div>
        <Divider style={{ margin: '4px 0' }} />
        <div className={style.tail}>
          <div className={style.badges}>
            <Tag color="lime">#{articleInfo.cateName}</Tag>
          </div>
          <div className={style.time}>
            {dayjs(articleInfo.time).fromNow()}
          </div>
        </div>
      </div>
    )
  }
}
