import React from 'react'
import style from '@/styles/components/Header.module.sass'
import ArticleCate from '@/types/ArticleCate'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface HeaderProps {
  articleCates: ArticleCate[]
}

const Header = (props: HeaderProps) => {
  const { articleCates } = props
  const router = useRouter()

  const navItems = [
    { label: '~/home', href: '/' },
    { label: '~/about', href: '/about' },
    ...articleCates.map(cate => ({
      label: `#${cate.cateName}`,
      href: `/cate/${encodeURIComponent(cate.cateName)}`,
    })),
  ]

  return (
    <div className={style.headerContainer}>
      <div className={style.dots}>
        <span className={`${style.dot} ${style.dotRed}`} />
        <span className={`${style.dot} ${style.dotYellow}`} />
        <span className={`${style.dot} ${style.dotGreen}`} />
      </div>
      <nav className={style.nav}>
        {navItems.map(item => (
          <Link href={item.href} key={item.href}>
            <a
              className={`${style.navLink} ${
                router.asPath === item.href ? style.navLinkActive : ''
              }`}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
      <span className={style.nickname}>foril</span>
    </div>
  )
}

export default Header
