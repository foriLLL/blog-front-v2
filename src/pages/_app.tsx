import style from '@/styles/frame.module.sass'
import type { AppProps } from 'next/app'
import '@/styles/globals.sass'
import '@/styles/antd-customized.css'
import Sider from '@/components/Sider'
import Header from '@/components/Header'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider, MenuTheme, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<MenuTheme>('light')
  const [primaryTextColor, setPrimaryTextColor] = useState<string>('black')
  // const [themeColor, setThemeColor] = useState<string>('red')

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark')
      setTheme('dark')
    } else {
      document.body.classList.remove('dark')
    }

    setPrimaryTextColor(
      document.body.style.getPropertyValue('--primary-text-color'),
    )
    // Header不能正常设置颜色，放弃了
    // setThemeColor(document.body.style.getPropertyValue('--theme-color'))
    // setTimeout(() => {
    //   setThemeColor('green')
    // }, 2000)
  }, [])

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleChangeStart = (url: string) => {
      setLoading(true)
    }

    const handleChangeComplete = (url: string) => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleChangeStart)
    router.events.on('routeChangeComplete', handleChangeComplete)
    router.events.on('routeChangeError', handleChangeComplete)

    return function cleanup() {
      router.events.off('routeChangeStart', handleChangeStart)
      router.events.off('routeChangeComplete', handleChangeComplete)
      router.events.off('routeChangeError', handleChangeComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>foriL.space</title>
        <meta name="description" content="foriL的个人博客" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: themeColor,
            colorPrimary: '#1e88e5',
            colorText: primaryTextColor,
            colorTextDescription: primaryTextColor,
            colorTextDisabled: primaryTextColor,
          },
        }}
        locale={zhCN}
      >
        <div className={style.frame}>
          <div className={style.frameLeft}>
            <Sider theme={theme} />
          </div>
          <div className={style.frameRight}>
            <div className={style.flexBox}>
              <Header theme={theme} />
              <Spin spinning={loading} indicator={<Loading />} delay={100}>
                <div className={style.component}>
                  <Component {...pageProps} />
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

export default MyApp
