import ArticleInfo from '@/types/ArticleInfo'
import React, { Component } from 'react'
import style from '@/styles/components/PostItem.module.sass'
import { Divider, Tag } from 'antd'
import Link from 'next/link'
import { BarChartOutlined } from '@ant-design/icons'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// 配置dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

interface IProps {
  articleInfo: ArticleInfo
}
export default class PostItem extends Component<IProps> {
  getNumberFromString: (str: string) => number = str => {
    let sum = 0
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i)
    }
    return sum
  }
  diffColor: (number: number) => string = cateId => {
    const colors = [
      '#758BFD',
      '#64CB0E',
      '#108ee9',
      '#cd201f',
      '#f50',
      '#03A9F4',
      '#FFB300',
      '#7E57C2',
    ]
    return colors[cateId % colors.length]
  }
  render() {
    const { articleInfo } = this.props
    return (
      <div className={style.container}>
        <Link
          href={`/article/${encodeURIComponent(
            articleInfo.cateName,
          )}/${encodeURIComponent(articleInfo.title)}`}
        >
          <a>
            <div className={style.innerContainer}>
              <div>
                <h2>{articleInfo.title}</h2>
                <Divider style={{ margin: '6px 0' }} />
              </div>
              <div className={style.middle}>
                {articleInfo.heroImage && articleInfo.heroImage !== '' && (
                  <img
                    className={style.heroImage}
                    src={articleInfo.heroImage}
                    alt="图片错误"
                  />
                )}
                <div className={style.description}>
                  {articleInfo.description}
                </div>
              </div>
              <div className={style.tail}>
                <div className={style.time}>
                  {articleInfo.time === '未知'
                    ? '未知'
                    : dayjs(articleInfo.time).fromNow()}
                </div>
                <div className={style.badges}>
                  <Tag
                    color={this.diffColor(
                      this.getNumberFromString(articleInfo.cateName),
                    )}
                  >
                    #{articleInfo.cateName}
                  </Tag>
                  {/* <Tag icon={<BarChartOutlined />} color="#F17203">
                    {articleInfo.views}
                  </Tag> */}
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  }
}
