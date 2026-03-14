import style from '@/styles/components/Loading.module.sass'

/**
 * 加载指示器
 * 终端风格的 "loading..." 文字 + 脉冲圆点动画
 */
export default function Loading() {
  return (
    <div className={style.loader}>
      <div className={style.text}>loading</div>
      <div className={style.dots}>
        <span className={style.dot} />
        <span className={style.dot} />
        <span className={style.dot} />
      </div>
    </div>
  )
}
