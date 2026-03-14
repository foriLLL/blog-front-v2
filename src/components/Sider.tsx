import React, { useState } from 'react'
import style from '@/styles/components/Sider.module.sass'
import Link from 'next/link'
import ArticleCate from '@/types/ArticleCate'
import { useRouter } from 'next/router'

// ASCII art for "foril" - pre-generated figlet style
const ASCII_ART = `  __            _ _ 
 / _| ___  _ __(_) |
| |_ / _ \\| '__| | |
|  _| (_) | |  | | |
|_|  \\___/|_|  |_|_|`

interface SiderProps {
  articleCates: ArticleCate[]
}

const Sider = (props: SiderProps) => {
  const router = useRouter()
  const { articleCates } = props
  const [cateOpen, setCateOpen] = useState(true)

  const navItems = [
    { label: '~/home', href: '/', key: '/' },
    { label: '~/about', href: '/about', key: '/about' },
  ]

  const socialLinks = [
    { label: 'github', url: 'https://github.com/foriLLL' },
    { label: 'email', url: 'mailto:1571825323@qq.com' },
    { label: 'leetcode', url: 'https://leetcode-cn.com/u/foril/' },
  ]

  return (
    <div className={style.container}>
      {/* Terminal title bar */}
      <div className={style.terminalBar}>
        <span className={`${style.dot} ${style.dotRed}`} />
        <span className={`${style.dot} ${style.dotYellow}`} />
        <span className={`${style.dot} ${style.dotGreen}`} />
        <span className={style.terminalTitle}>foril@blog ~ </span>
      </div>

      {/* Profile section */}
      <div className={style.profile}>
        <pre className={style.asciiArt}>{ASCII_ART}</pre>
        <div className={style.bio}>
          <span style={{ color: 'var(--text-muted)' }}>{'// '}</span>
          developer & blogger
        </div>
        <div className={style.links}>
          {socialLinks.map(link => (
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

      {/* Navigation */}
      <nav className={style.nav}>
        {navItems.map(item => (
          <Link href={item.href} key={item.key}>
            <a
              className={`${style.navItem} ${
                router.asPath === item.key ? style.navItemActive : ''
              }`}
            >
              <span className={style.prompt}>$</span>
              {item.label}
            </a>
          </Link>
        ))}

        {/* Categories */}
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
