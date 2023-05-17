import style from '@/styles/components/Loading.module.sass'
export default function Loading() {
  return (
    <div className={style.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
