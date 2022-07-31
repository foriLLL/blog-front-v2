import React from 'react'
import style from '@/styles/components/Menu.module.sass'
import { List, Tabs } from 'antd'
const { TabPane } = Tabs;

export default function Menu(props: { headings: Array<HTMLHeadingElement> }) {
  const scrollToTaget = (id: string | null) => {
    if (!id) return;
    const heading = document.getElementById(id)
    if (!heading) return;
    heading.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const data = props.headings.map(heading => {
    return (
      <a key={heading.getAttribute('id')}
        onClick={(e) => { scrollToTaget(heading.getAttribute('id')) }}
      >
        {heading.getAttribute('id')}
      </a >
    )
  })


  return (
    <div className={style.container}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="目录" key="1">
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />

        </TabPane>
      </Tabs>

    </div>
  )
}
