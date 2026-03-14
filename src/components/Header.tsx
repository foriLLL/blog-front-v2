import React from 'react'
import style from '@/styles/components/Header.module.sass'
import ArticleCate from '@/types/ArticleCate'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NAV_ITEMS, SITE_NAME } from '@/constants/site'

interface HeaderProps {
  articleCates: ArticleCate[]
}

/**
 * 移动端顶部导航栏（桌面端隐藏）
 * 替代侧边栏的功能，以终端标签栏形式展示导航和分类
 */
const Header = ({ articleCates }: HeaderProps) => {
  const router = useRouter()

  // 合并固定导航项和动态分类项
  const allNavItems = [
    ...NAV_ITEMS,
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
        {allNavItems.map(item => (
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
      <span className={style.nickname}>{SITE_NAME}</span>
    </div>
  )
}

export default Header
