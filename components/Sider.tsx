import React, { useEffect, useState } from 'react'
import style from '@/styles/components/Sider.module.sass'
import Link from 'next/link'
import { Menu, MenuTheme } from 'antd'
import ArticleCate from '@/types/ArticleCate'
import { getAllArticleCates } from '@/api/articleCateApi'
import { useRouter } from 'next/router'
import avatar from '../public/imgs/avatar.jpg'
import gitee from '../public/imgs/gitee.svg'
import github from '../public/imgs/github.svg'
import mail from '../public/imgs/mail.svg'
import Image from 'next/image'

const Sider = (props: { theme: MenuTheme }) => {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])
  const router = useRouter()

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data)
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
          <Link href={`/cate/${cate.cateId}`}>
            <a>{cate.cateName}</a>
          </Link>
        ),
        key: `/cate/${cate.cateId}`,
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
          src={avatar}
          alt="avatar"
          width="100px"
          height="100px"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <h1>foriL</h1>
      <div className={style.linkBox}>
        <Link href={'https://gitee.com/foril'}>
          <a>
            <Image src={gitee} height="20px" width="20px" alt="gitee" />
          </a>
        </Link>
        <Link href={'mailto:1571825323@qq.com'}>
          <a>
            <Image src={mail} height="20px" width="20px" alt="email" />
          </a>
        </Link>
        <Link href={'https://github.com/foriLLL'}>
          <a>
            <Image src={github} height="20px" width="20px" alt="github" />
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
