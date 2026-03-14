import { getAbout } from '@/requests/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetServerSideProps } from 'next'
import React from 'react'
import style from '@/styles/about.module.sass'
import { ABOUT_ASCII } from '@/constants/ascii'

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
 * 顶部 ASCII Art 大字 + 终端 `cat` 命令输出的形式展示 README.md 内容
 */
export default function AboutPage({ about }: AboutPageProps) {
  return (
    <div className={style.container}>
      {/* ASCII Art 大字标题 */}
      <div className={style.asciiHeader}>
        <pre className={style.asciiArt}>{ABOUT_ASCII}</pre>
      </div>

      {/* 终端命令提示 */}
      <div className={style.commandLine}>
        <span className={style.prompt}>$</span> cat ~/about.md
      </div>

      {/* 正文内容 */}
      <Markdown>{about.content}</Markdown>
    </div>
  )
}
