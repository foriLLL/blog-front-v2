import React, { useEffect, useState } from 'react';
import style from "@/styles/components/Sider.module.sass"
import Link from 'next/link';
import { Menu } from 'antd';
import ArticleCate from '@/types/ArticleCate';
import { getAllArticleCates } from '@/api/articleCateApi';

interface IState {
  ifDarkTheme: boolean
  articleCates: ArticleCate[]
}
class Sider extends React.Component<{}, IState>{
  constructor(props: {}) {
    super(props)
    this.state = {
      ifDarkTheme: false,
      articleCates: []
    }
  }

  async componentDidMount() {
    const articleCates = await getAllArticleCates();
    this.setState({
      articleCates
    })
  }



  render() {
    const {articleCates} = this.state;
    const items = [
      { label: '首页', key: 'index' }, // 菜单项务必填写 key
      {
        label: '分类',
        key: 'cate',
        children: articleCates.map(cate => ({
          label: cate.cateName,
          key: cate.cateId
        })),
      },
      { label: '关于', key: 'about' },
    ];
    return (
      <div className={style.container}>
        <div className={style.avatarBox}>
          <img src="/imgs/avatar.jpg" alt="avatar" className={style.avatar} />
        </div>
        <h1>foriL</h1>
        <div className={style.linkBox}>
          <Link href={"https://gitee.com/foril"}>
            <a><img className={style.link} src='/imgs/gitee.svg' /></a>
          </Link>
          <Link href={"https://gitee.com/foril"}>
            <a><img className={style.link} src='/imgs/mail.svg' /></a>
          </Link>
          <Link href={"https://gitee.com/foril"}>
            <a><img className={style.link} src='/imgs/github.svg' /></a>
          </Link>
        </div>
        <div className={style.menu}>
          <Menu items={items} mode='inline' theme='light' defaultOpenKeys={['cate']} />
        </div>
      </div>
    )
  }
}

export default Sider
