import React, { useEffect, useState } from 'react'
import style from '@/styles/components/Header.module.sass'
import { Menu, MenuProps, MenuTheme } from 'antd'
import { HomeOutlined, InfoCircleOutlined, MailOutlined, TagOutlined, TagsOutlined } from '@ant-design/icons';
import ArticleCate from '@/types/ArticleCate';
import { getAllArticleCates } from '@/api/articleCateApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'
import avatar from '../public/imgs/avatar.jpg';

const Header = (props:{theme:MenuTheme}) => {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])
  const router = useRouter()

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data);
    })
  }, [])

  const items: MenuProps['items'] = [
    {
      label: <Link href='/'><a>首页</a></Link>,
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: '分类',
      key: '/cate',
      icon: <TagsOutlined />,
      children: articleCates.map(cate => ({
        label: <Link href={`/cate/${cate.cateId}`}><a>{cate.cateName}</a></Link>,
        key: `/cate/${cate.cateId}`,
        icon: <TagOutlined />
      }))
    },
    {
      label: <Link href='/about'><a>关于</a></Link>,
      key: '/about',
      icon: <InfoCircleOutlined />
    }]

  return (
    <div className={style.headerContainer}>
      <div className={style.navigator}>
        <Menu mode="horizontal" items={items} theme={props.theme}
          selectedKeys={[router.asPath]}
        />
      </div>
      <div className={style.headerInfo}>
        <Image src={avatar} alt='avatar' width='30px' height='30px' style={{borderRadius:'50%'}}/>
        <h2>foriL</h2>
      </div>
    </div>
  )
}

export default Header;
