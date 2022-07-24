import style from '@/styles/frame.module.sass'
import type { AppProps } from 'next/app'
import '@/styles/globals.sass'
import '@/styles/antd-customized.css'
import Sider from '@/components/Sider'
import Header from '@/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={style.frame}>
      <div className={style.frameLeft}>
        <Sider />
      </div>
      <div className={style.frameRight}>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>)
}

export default MyApp
