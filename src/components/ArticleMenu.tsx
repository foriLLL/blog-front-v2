import React from 'react'
import { List } from 'antd'

export default function ArticleMenu(props: {
  headings: Array<HTMLHeadingElement>
  afterClick: () => void
}) {
  const scrollToTaget = (id: string | null) => {
    if (!id) return
    const heading = document.getElementById(id)
    if (!heading) return
    heading.scrollIntoView({
      behavior: 'smooth',
      // block: 'start',   // bug：设置为start会在有些时候出现问题（有的最底部heading会导致整个html上移，下方留下空白   https://juejin.cn/post/6977187578898284558
      block: 'nearest',
      // inline: 'nearest',
    })
  }

  const data = props.headings.map(heading => {
    return (
      <a
        key={heading.getAttribute('id')}
        onClick={e => {
          scrollToTaget(heading.getAttribute('id'))
          props.afterClick()
        }}
        style={{ display: 'block', width: '100%' }}
      >
        {heading.getAttribute('id')}
      </a>
    )
  })

  return (
    <List
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  )
}
