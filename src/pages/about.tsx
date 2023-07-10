import { getAbout } from '@/requests/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetServerSideProps } from 'next'
import React, { Component, useEffect, useState } from 'react'
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
      <Markdown>{about.content}</Markdown>
    </div>
  )
}
