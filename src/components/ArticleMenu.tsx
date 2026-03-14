import React from 'react'
import style from '@/styles/ArticleDisplay.module.sass'

interface ArticleMenuProps {
  headings: Array<HTMLHeadingElement>
  afterClick: () => void
}

/**
 * 文章目录组件
 * 在 TOC 抽屉中渲染 h2 标题列表，点击后平滑滚动到对应标题
 */
export default function ArticleMenu({
  headings,
  afterClick,
}: ArticleMenuProps) {
  const scrollToTarget = (id: string | null) => {
    if (!id) return
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  return (
    <div>
      {headings.map(heading => {
        const id = heading.getAttribute('id')
        return (
          <a
            key={id}
            className={style.tocItem}
            onClick={() => {
              scrollToTarget(id)
              afterClick()
            }}
          >
            → {id}
          </a>
        )
      })}
    </div>
  )
}
