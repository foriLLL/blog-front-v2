import ArticleInfo from '@/types/ArticleInfo'
import React, { Component } from 'react'
import style from '@/styles/components/PostItem.module.sass'
import { Divider, Tag } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
// 配置dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { BarChartOutlined } from '@ant-design/icons';
dayjs.locale('zh-cn')
dayjs.extend(relativeTime);

interface IProps {
  articleInfo: ArticleInfo
}
export default class PostItem extends Component<IProps> {
  diffColor: (number: number) => string = (cateId) => {
    const colors = ["#758BFD", "#64CB0E", "#108ee9", "#cd201f", "#f50"];
    // const colors = ["purple", "blue", "volcano", "lime", "cyan"];
    return colors[cateId % colors.length];
  }
  render() {
    const { articleInfo } = this.props;
    return (
      <div className={style.container}>
        <Link href={`/article/${articleInfo.articleId}`}>
          <a>
            <h2>{articleInfo.title}</h2>
            <Divider style={{ margin: '6px 0' }} />
            {/* <Markdown></Markdown> */}
            <div className={style.middle}>
              {articleInfo.coverImg && articleInfo.coverImg !== '' &&
                <img className={style.coverImg} src={articleInfo.coverImg} />
              }
              <div className={style.description}>{articleInfo.description}</div>
            </div>
            <div className={style.tail}>
              <div className={style.time}>
                {dayjs(articleInfo.time).fromNow()}
              </div>
              <div className={style.badges}>
                <Tag color={this.diffColor(articleInfo.cateId)}>#{articleInfo.cateName}</Tag>
                <Tag icon={<BarChartOutlined />} color='#F17203'>{articleInfo.views}</Tag>
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  }
}
