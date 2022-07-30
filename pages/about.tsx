import { getAbout } from '@/api/about'
import Markdown from '@/components/Markdown'
import About from '@/types/About'
import { GetStaticProps } from 'next'
import React, { Component } from 'react'
import style from '@/styles/about.module.sass'

interface IProps {
  about: About
}
export const getStaticProps: GetStaticProps = async () => {
  const about: About | undefined = await getAbout();
  if (!!about) {
    return {
      props: {
        about
      }
    }
  }
  return { notFound: true }
}
export default class about extends Component<IProps> {
  render() {
    return (
      <div className={style.container}>
        <Markdown>
          {this.props.about.content}
        </Markdown>
      </div>
    )
  }
}
