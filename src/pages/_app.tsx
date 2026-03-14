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
import { SITE_TITLE, SITE_DESCRIPTION } from '@/constants/site'
import { useTheme } from '@/hooks/useTheme'

/**
 * 应用根组件
 * 负责全局布局（侧边栏 + Header + 内容区）、路由加载状态、分类数据获取、主题切换
 */
function MyApp({ Component, pageProps }: AppProps) {
  const [articleCates, setArticleCates] = useState<ArticleCate[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toggleTheme, themeIcon, themeLabel } = useTheme()

  // 获取文章分类列表（客户端）
  useEffect(() => {
    getAllArticleCates().then(setArticleCates)
  }, [])

  // 监听路由切换，显示/隐藏加载动画
  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/avatar.jpg" />
      </Head>

      <div className={style.frame}>
        {/* 桌面端侧边栏 */}
        <div className={style.frameLeft}>
          <Sider
            articleCates={articleCates}
            onToggleTheme={toggleTheme}
            themeIcon={themeIcon}
            themeLabel={themeLabel}
          />
        </div>
        <div className={style.frameRight}>
          {/* 移动端顶部导航 */}
          <div className={style.header}>
            <Header
              articleCates={articleCates}
              onToggleTheme={toggleTheme}
              themeIcon={themeIcon}
            />
          </div>
          {/* 页面内容区 */}
          <div className={style.component}>
            {loading ? <Loading /> : <Component {...pageProps} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyApp
