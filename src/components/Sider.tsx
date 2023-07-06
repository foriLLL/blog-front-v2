import React, { useEffect, useState } from 'react'
import style from '@/styles/components/Sider.module.sass'
import Link from 'next/link'
import { Menu, MenuTheme } from 'antd'
import ArticleCate from '@/types/ArticleCate'
import { getAllArticleCates } from '@/requests/articleCate'
import { getIconLinks, getNickname } from '@/requests/meta'
import { useRouter } from 'next/router'
import Image from 'next/image'
import IconLink from '@/types/IconLink'

interface MetaProps {
  articleCates: ArticleCate[]
  iconLinks: IconLink[]
  nickname: string
}

const Sider = (
  props: {
    theme: MenuTheme
  } & MetaProps,
) => {
  const router = useRouter()
  const { articleCates, iconLinks, nickname } = props

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
          src={'/static/avatar.jpg'}
          alt="avatar"
          width="200px"
          height="200px"
          objectFit="cover"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <h1 className={style.nickname}>{nickname}</h1>
      <div className={style.linkBox}>
        {iconLinks.map(il => (
          <Link href={il.url ? il.url : ''} key={il.url}>
            <a>
              <Image
                src={il.iconSVG}
                height="20px"
                width="20px"
                alt="gitee"
                title={il.description || '链接'}
              />
            </a>
          </Link>
        ))}
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
