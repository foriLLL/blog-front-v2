import React, { useEffect, useState } from 'react'
import style from '@/styles/components/Sider.module.sass'
import Link from 'next/link'
import { Menu, MenuTheme } from 'antd'
import ArticleCate from '@/types/ArticleCate'
import { getAllArticleCates } from '@/requests/articleCate'
import { getNickname } from '@/requests/meta'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Sider = (props: { theme: MenuTheme }) => {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])
  const [nickname, setNickname] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data)
    })
    getNickname().then(data => {
      setNickname(data)
    })
  }, [])

  const items = [
    {
      label: (
        <Link href={'/'}>
          <a>首页</a>
        </Link>
      ),
      key: '/',
    }, // 菜单项务必填写 key
    {
      label: '分类',
      key: 'cate',
      children: articleCates.map(cate => ({
        label: (
          <Link href={`/cate/${encodeURIComponent(cate.cateName)}`}>
            <a>{cate.cateName}</a>
          </Link>
        ),
        key: `/cate/${encodeURIComponent(cate.cateName)}`,
      })),
    },
    {
      label: (
        <Link href={'/about'}>
          <a>关于</a>
        </Link>
      ),
      key: '/about',
    },
  ]

  return (
    <div className={style.container}>
      <div className={style.avatarBox}>
        <Image
          src={'/imgs/avatar.jpg'}
          alt="avatar"
          width="150px"
          height="150px"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <h1 className={style.nickname}>{nickname}</h1>
      <div className={style.linkBox}>
        <Link href={'https://gitee.com/foril'}>
          <a>
            <Image
              src={'/imgs/gitee.svg'}
              height="20px"
              width="20px"
              alt="gitee"
            />
          </a>
        </Link>
        <Link href={'mailto:1571825323@qq.com'}>
          <a>
            <Image
              src={'/imgs/mail.svg'}
              height="20px"
              width="20px"
              alt="email"
            />
          </a>
        </Link>
        <Link href={'https://github.com/foriLLL'}>
          <a>
            <Image
              src={'/imgs/github.svg'}
              height="20px"
              width="20px"
              alt="github"
            />
          </a>
        </Link>
      </div>
      <div className={style.menu}>
        <Menu
          items={items}
          mode="inline"
          theme={props.theme}
          selectedKeys={[router.asPath]}
        />
      </div>
    </div>
  )
}

export default Sider
