import style from '@/styles/frame.module.sass'
import type { AppProps } from 'next/app'
import '@/styles/globals.sass'
import '@/styles/antd-customized.css'
import Sider from '@/components/Sider'
import Header from '@/components/Header'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider, MenuTheme } from 'antd'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<MenuTheme>('light');

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (localStorage.theme === 'dark'
        || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.body.classList.add('dark');
        setTheme('dark')
      } else {
        document.body.classList.remove('dark');
      }
    }, [localStorage.theme]);
  }

return (
  <ConfigProvider locale={zhCN}>
    <div className={style.frame}>
      <div className={style.frameLeft}>
        <Sider theme={theme} />
      </div>
      <div className={style.frameRight}>
        <Header theme={theme} />
        <div className={style.component}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  </ConfigProvider>)
}

export default MyApp
