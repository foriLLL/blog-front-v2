import style from '@/styles/frame.module.sass'
import App, { AppContext, AppProps } from 'next/app'
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
import {
  SCROLL_ROOT_ID,
  markPopNavigation,
  isPopNavigation,
  saveScrollPosition,
  getCurrentScrollTop,
  getSavedScrollPosition,
  restoreScrollPosition,
} from '@/utils/scrollMemory'

/**
 * 应用根组件
 * 负责全局布局（侧边栏 + Header + 内容区）、路由加载状态、分类数据获取、主题切换
 */

function MyApp({
  Component,
  pageProps,
  articleCates = [],
}: AppProps & { articleCates: ArticleCate[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toggleTheme, themeIcon, themeLabel } = useTheme()

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

  // 记忆滚动位置：滚动时按路径持续保存，浏览器前进/后退返回时恢复
  useEffect(() => {
    // 关闭浏览器原生滚动恢复，避免与手动恢复互相打架
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 必须滚动时持续保存，而不能等 routeChangeStart 再读：
    // 该事件触发后 Loading 动画会同步卸载列表，滚动位置已被钳制为 0
    let scrollTicking = false
    const handleScroll = (event: Event) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      if (!document.getElementById(SCROLL_ROOT_ID)?.contains(target)) return
      const top = target.scrollTop
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        scrollTicking = false
        saveScrollPosition(router.asPath, top)
      })
    }
    const handleUnload = () =>
      saveScrollPosition(router.asPath, getCurrentScrollTop())
    const handleRestore = (url: string) => {
      if (!isPopNavigation()) return
      const y = getSavedScrollPosition(url)
      if (y === null) return
      // 等 Next 完成路由提交和本帧渲染后再恢复
      requestAnimationFrame(() => restoreScrollPosition(y))
    }

    // scroll 不冒泡但捕获阶段可达，用委托监听内容区里所有滚动容器
    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    })
    router.events.on('routeChangeComplete', handleRestore)
    window.addEventListener('beforeunload', handleUnload)
    router.beforePopState(() => {
      markPopNavigation()
      return true
    })

    // 整页刷新时恢复刷新前的位置
    const navEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    if (navEntry?.type === 'reload') {
      const y = getSavedScrollPosition(router.asPath)
      if (y !== null) {
        requestAnimationFrame(() => restoreScrollPosition(y))
      }
    }

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true })
      router.events.off('routeChangeComplete', handleRestore)
      window.removeEventListener('beforeunload', handleUnload)
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
          {/* 页面内容区（全站唯一的滚动容器，id 供滚动位置记忆使用） */}
          <div id="page-scroll-container" className={style.component}>
            {loading ? <Loading /> : <Component {...pageProps} />}
          </div>
        </div>
      </div>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const articleCates = await getAllArticleCates()
  return { ...appProps, articleCates }
}

export default MyApp
