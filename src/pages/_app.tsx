import style from '@/styles/frame.module.sass'
import type { AppProps } from 'next/app'
import '@/styles/globals.sass'
import Sider from '@/components/Sider'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import Head from 'next/head'
import { getAllArticleCates } from '@/requests/articleCate'
import ArticleCate from '@/types/ArticleCate'

function MyApp({ Component, pageProps }: AppProps) {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data)
    })
  }, [])

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleChangeStart = () => setLoading(true)
    const handleChangeComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleChangeStart)
    router.events.on('routeChangeComplete', handleChangeComplete)
    router.events.on('routeChangeError', handleChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleChangeStart)
      router.events.off('routeChangeComplete', handleChangeComplete)
      router.events.off('routeChangeError', handleChangeComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>foril — terminal blog</title>
        <meta name="description" content="foril 的个人博客 — 终端风格" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/avatar.jpg" />
      </Head>

      <div className={style.frame}>
        <div className={style.frameLeft}>
          <Sider articleCates={articleCates} />
        </div>
        <div className={style.frameRight}>
          <div className={style.header}>
            <Header articleCates={articleCates} />
          </div>
          <div className={style.component}>
            {loading ? <Loading /> : <Component {...pageProps} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyApp
