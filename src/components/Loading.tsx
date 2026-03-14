import style from '@/styles/components/Loading.module.sass'

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
