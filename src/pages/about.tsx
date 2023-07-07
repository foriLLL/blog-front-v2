import { getAbout } from '@/requests/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetStaticProps } from 'next'
import React, { Component, useEffect, useState } from 'react'
import style from '@/styles/about.module.sass'

// export const getStaticProps: GetStaticProps = async () => {
//   const about: About | undefined = await getAbout()
//   if (!!about) {
//     return {
//       props: {
//         about,
//       },
//     }
//   }
//   return { notFound: true }
// }

export default function AboutPage() {
  const [about, setAbout] = useState<About>({ content: '' })

  useEffect(() => {
    const setAboutContent = async () => {
      const about: About | undefined = await getAbout()
      if (!!about) {
        setAbout(about)
      }
    }
    setAboutContent()
  })

  return (
    <div className={style.container}>
      <Markdown>{about.content}</Markdown>
    </div>
  )
}
