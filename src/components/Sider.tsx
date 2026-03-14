import React, { useState } from 'react'
import style from '@/styles/components/Sider.module.sass'
import Link from 'next/link'
import ArticleCate from '@/types/ArticleCate'
import { useRouter } from 'next/router'
import { NAV_ITEMS, SOCIAL_LINKS, SITE_NAME } from '@/constants/site'
import { LOGO_ASCII } from '@/constants/ascii'

interface SiderProps {
  articleCates: ArticleCate[]
}

/**
 * 侧边栏组件（桌面端显示）
 * 包含终端标题栏、ASCII Art Logo、社交链接、导航菜单和分类列表
 */
const Sider = ({ articleCates }: SiderProps) => {
  const router = useRouter()
  const [cateOpen, setCateOpen] = useState(true)

  return (
    <div className={style.container}>
      {/* 终端标题栏 */}
      <div className={style.terminalBar}>
        <span className={`${style.dot} ${style.dotRed}`} />
        <span className={`${style.dot} ${style.dotYellow}`} />
        <span className={`${style.dot} ${style.dotGreen}`} />
        <span className={style.terminalTitle}>{SITE_NAME}@blog ~ </span>
      </div>

      {/* 个人信息 */}
      <div className={style.profile}>
        <pre className={style.asciiArt}>{LOGO_ASCII}</pre>
        <div className={style.bio}>
          <span style={{ color: 'var(--text-muted)' }}>{'// '}</span>
          developer & blogger
        </div>
        <div className={style.links}>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={style.linkItem}
            >
              [{link.label}]
            </a>
          ))}
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className={style.nav}>
        {NAV_ITEMS.map(item => (
          <Link href={item.href} key={item.href}>
            <a
              className={`${style.navItem} ${
                router.asPath === item.href ? style.navItemActive : ''
              }`}
            >
              <span className={style.prompt}>$</span>
              {item.label}
            </a>
          </Link>
        ))}

        {/* 文章分类（可折叠） */}
        <div className={style.cateGroup}>
          <div
            className={style.cateLabel}
            onClick={() => setCateOpen(!cateOpen)}
          >
            <span className={style.prompt}>{cateOpen ? '▼' : '▶'}</span>
            &nbsp;~/categories
          </div>
          <div
            className={`${style.cateChildren} ${
              cateOpen ? style.cateChildrenOpen : ''
            }`}
          >
            {articleCates.map(cate => {
              const href = `/cate/${encodeURIComponent(cate.cateName)}`
              return (
                <Link href={href} key={cate.cateName}>
                  <a
                    className={`${style.navItem} ${style.subNavItem} ${
                      router.asPath === href ? style.navItemActive : ''
                    }`}
                  >
                    <span className={style.prompt}>→</span>
                    {cate.cateName}
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sider
