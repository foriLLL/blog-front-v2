import React, { useEffect, useState } from 'react'
import style from '@/styles/components/Header.module.sass'
import { Menu, MenuProps, MenuTheme } from 'antd'
import {
  HomeOutlined,
  InfoCircleOutlined,
  TagOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import ArticleCate from '@/types/ArticleCate'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Image from 'next/image'
import IconLink from '@/types/IconLink'

interface MetaProps {
  articleCates: ArticleCate[]
  nickname: string
  iconLinks: IconLink[]
}
const Header = (props: { theme: MenuTheme } & MetaProps) => {
  const { articleCates, nickname, iconLinks } = props
  const router = useRouter()
  const items: MenuProps['items'] = [
    {
      label: (
        <Link href="/">
          <a>首页</a>
        </Link>
      ),
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: '分类',
      key: '/cate',
      icon: <TagsOutlined />,
      children: articleCates.map(cate => ({
        label: (
          <Link href={`/cate/${encodeURIComponent(cate.cateName)}`}>
            <a>{cate.cateName}</a>
          </Link>
        ),
        key: `/cate/${encodeURIComponent(cate.cateName)}`,
        icon: <TagOutlined />,
      })),
    },
    {
      label: (
        <Link href="/about">
          <a>关于</a>
        </Link>
      ),
      key: '/about',
      icon: <InfoCircleOutlined />,
    },
  ]

  return (
    <div className={style.headerContainer}>
      <div className={style.navigator}>
        {/* bug: 深色模式下，选定menu之后selected颜色不会直接显示，需要晃晃鼠标，应该是antd bug，官方demo也是这样 */}
        <Menu
          mode="horizontal"
          items={items}
          theme={props.theme}
          selectedKeys={[router.asPath]}
        />
      </div>
      <div className={style.headerInfo}>
        <Image
          src={'/static/avatar.jpg'}
          alt="avatar"
          width="30px"
          height="30px"
          style={{ borderRadius: '50%' }}
        />
        <h2>{nickname}</h2>
      </div>
    </div>
  )
}

export default Header
