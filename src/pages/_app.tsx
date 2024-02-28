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
import { getAllArticleCates } from '@/requests/articleCate'
import { getIconLinks, getNickname } from '@/requests/meta'
import ArticleCate from '@/types/ArticleCate'
import IconLink from '@/types/IconLink'

const staticIconLinks = [
  {
    iconSVG: '/imgs/mail.svg',
    url: 'mailto:1571825323@qq.com',
    description: '邮箱',
  },
  {
    iconSVG: '/imgs/github.svg',
    url: 'https://github.com/foriLLL',
    description: 'GitHub',
  },
  {
    iconSVG: '/imgs/leetcode.svg',
    url: 'https://leetcode-cn.com/u/foril/',
    description: 'LeetCode',
  },
  {
    iconSVG: '/imgs/gitee.svg',
    url: 'https://gitee.com/foril',
    description: '码云',
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<MenuTheme>('light')
  const [primaryTextColor, setPrimaryTextColor] = useState<string>('black')
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])
  const [nickname, setNickname] = useState<string>('🧊foril') // 该版本中暂不使用请求方法，静态设置
  const [iconLinks, setIconLinks] = useState<IconLink[]>(staticIconLinks)

  useEffect(() => {
    // 添加主题监听器
    const theme = window.matchMedia('(prefers-color-scheme: dark)')
    const changeTheme = () => {
      if (theme.matches) {
        setTheme('dark')
        setPrimaryTextColor('white')
      } else {
        setTheme('light')
        setPrimaryTextColor('black')
      }
    }
    theme.addEventListener('change', changeTheme)
    changeTheme()
    return () => {
      theme.removeEventListener('change', changeTheme)
    }
  })

  useEffect(() => {
    getAllArticleCates().then(data => {
      setArticleCates(data)
    })
    // 目前版本都用静态设置
    // getNickname().then(data => {
    //   setNickname(data)
    // })
    // getIconLinks().then(data => {
    //   setIconLinks(data)
    // })
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
      {/* <Script id="show-banner">{`
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      `}</Script> */}
      <Head>
        <title>🧊foriL 的个人博客</title>
        <meta name="description" content="foriL 的个人博客" />
        <link rel="icon" href="imgs/avatar.jpg" />
      </Head>

      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: themeColor,
            colorPrimary: '#436850',
            colorText: primaryTextColor,
            colorTextDescription: primaryTextColor,
            colorTextDisabled: primaryTextColor,
          },
        }}
        locale={zhCN}
      >
        <div className={style.frame}>
          <div className={style.frameLeft}>
            <Sider
              theme={theme}
              iconLinks={iconLinks}
              articleCates={articleCates}
              nickname={nickname}
            />
          </div>
          <div className={style.frameRight}>
            <div className={style.flexBox}>
              <Header
                theme={theme}
                iconLinks={iconLinks}
                articleCates={articleCates}
                nickname={nickname}
              />
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
