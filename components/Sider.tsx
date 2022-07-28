import React, { useEffect, useState } from 'react';
import style from "@/styles/components/Sider.module.sass"
import Link from 'next/link';
import { Menu, MenuTheme } from 'antd';
import ArticleCate from '@/types/ArticleCate';
import { getAllArticleCates } from '@/api/articleCateApi';
import { useRouter } from 'next/router'


const Sider = (props:{theme: MenuTheme}) => {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data);
    })
  }, [typeof window])

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
        <Menu items={items} mode='inline' theme={props.theme} defaultOpenKeys={['cate']} selectedKeys={[router.asPath]} />
      </div>
    </div>
  )
}

export default Sider
