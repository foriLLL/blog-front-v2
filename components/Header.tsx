import React, { Component } from 'react'
import style from '@/styles/components/Header.module.sass'
import { Menu, MenuProps } from 'antd'
import { HomeOutlined, InfoCircleOutlined, MailOutlined, TagOutlined, TagsOutlined } from '@ant-design/icons';
import ArticleCate from '@/types/ArticleCate';
import { getAllArticleCates } from '@/api/articleCateApi';

// bug: 在移动端点击Menu会崩溃
interface IState {
  articleCates: ArticleCate[]
}
export default class Header extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articleCates: []
    };
  }

  async componentDidMount() {
    const articleCates = await getAllArticleCates();
    this.setState({
      articleCates
    })
  }

  render() {
    const { articleCates } = this.state;
    const items: MenuProps['items'] = [
      {
        label: '首页',
        key: 'home',
        icon: <HomeOutlined />,
      },
      {
        label: '分类',
        key: 'articleCate',
        icon: <TagsOutlined />,
        children: articleCates.map(cate => ({
          label: cate.cateName,
          key: cate.cateId,
          icon: <TagOutlined />
        }))
      },
      {
        label: '关于',
        key: 'about',
        icon: <InfoCircleOutlined />
      }]
      const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
      };
    return (
      <div className={style.headerContainer}>
        <div className={style.navigator}>
          <Menu onClick={onClick} mode="horizontal" items={items} theme='light' />
        </div>
        <div className={style.headerInfo}>
          <img src='/imgs/avatar.jpg' alt='' />
          <h2>foriL</h2>
        </div>
      </div>
    )
  }
}
