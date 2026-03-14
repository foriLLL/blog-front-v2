import { getAbout } from '@/requests/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetServerSideProps } from 'next'
import React from 'react'
import style from '@/styles/about.module.sass'

interface IProps {
  about: About
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const about: About | undefined = await getAbout()
  if (!!about) {
    return {
      props: {
        about,
      },
    }
  }
  return { notFound: true }
}

export default function AboutPage(props: IProps) {
  const { about } = props
  return (
    <div className={style.container}>
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
