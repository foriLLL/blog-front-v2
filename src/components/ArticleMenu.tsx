import React from 'react'

interface ArticleMenuProps {
  headings: Array<HTMLHeadingElement>
  afterClick: () => void
}

export default function ArticleMenu(props: ArticleMenuProps) {
  const scrollToTarget = (id: string | null) => {
    if (!id) return
    const heading = document.getElementById(id)
    if (!heading) return
    heading.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  return (
    <div>
      {props.headings.map(heading => {
        const id = heading.getAttribute('id')
        return (
          <a
            key={id}
            onClick={() => {
              scrollToTarget(id)
              props.afterClick()
            }}
            style={{
              display: 'block',
              padding: '6px 20px',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              ;(e.target as HTMLElement).style.backgroundColor =
                'var(--selection-bg)'
              ;(e.target as HTMLElement).style.color = 'var(--text-accent)'
            }}
            onMouseLeave={e => {
              ;(e.target as HTMLElement).style.backgroundColor = 'transparent'
              ;(e.target as HTMLElement).style.color = 'var(--text-secondary)'
            }}
          >
            → {id}
          </a>
        )
      })}
    </div>
  )
}
