import React from 'react';
import style from "@/styles/components/Sider.module.sass"
import Link from 'next/link';
import { Menu, MenuProps } from 'antd';
import ArticleCate from '@/types/ArticleCate';
import { getAllArticleCates } from '@/api/articleCateApi';
import { Router, withRouter } from 'next/router'

interface IProps {
  router: Router
}
interface IState {
  ifDarkTheme: boolean
  articleCates: ArticleCate[]
  selectedKeys: string[]
}
class Sider extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      ifDarkTheme: false,
      articleCates: [],
      selectedKeys: [this.props.router.pathname]
    }
  }

  async componentDidMount() {
    const articleCates = await getAllArticleCates();
    this.setState({
      articleCates
    })
  }

  refreshSelected: MenuProps["onClick"] = (e) => {
    this.setState({
      selectedKeys: [e.key]
    })
  }

  render() {
    const { articleCates } = this.state;
    const { selectedKeys } = this.state
    const items = [
      { label: <Link href={"/"}><a>首页</a></Link>, key: '/' }, // 菜单项务必填写 key
      {
        label: '分类',
        key: 'cate',
        children: articleCates.map(cate => ({
          label: <Link href={`/cate/${cate.cateId}`}><a>{cate.cateName}</a></Link>,
          key: `/cate/${cate.cateId}`
        })),
      },
      { label: <Link href={"/about"}><a>关于</a></Link>, key: "/about" },
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
          <Menu onClick={this.refreshSelected} items={items} mode='inline' theme='light' defaultOpenKeys={['cate']} selectedKeys={selectedKeys} />
        </div>
      </div>
    )
  }
}

export default withRouter(Sider);
