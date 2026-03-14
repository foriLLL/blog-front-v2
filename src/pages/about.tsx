import { getAbout } from '@/requests/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetServerSideProps } from 'next'
import React from 'react'
import style from '@/styles/about.module.sass'

interface AboutPageProps {
  about: About
}

export const getServerSideProps: GetServerSideProps<
  AboutPageProps
> = async () => {
  const about = await getAbout()
  return about ? { props: { about } } : { notFound: true }
}

/**
 * "关于"页面
 * 以终端 `cat` 命令输出的形式展示 README.md 内容
 */
export default function AboutPage({ about }: AboutPageProps) {
  return (
    <div className={style.container}>
      {/* 终端命令提示 */}
      <div
        style={{
          color: 'var(--text-muted)',
          fontSize: '12px',
          marginBottom: '16px',
        }}
      >
        <span style={{ color: 'var(--prompt-color)', fontWeight: 600 }}>$</span>{' '}
        cat ~/about.md
      </div>
      <Markdown>{about.content}</Markdown>
    </div>
  )
}
