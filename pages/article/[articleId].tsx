import { NextPage } from 'next'
import React from 'react'
import style from '@/styles/ArticleDisplay.module.sass'

const ArticleDisplay: NextPage = () => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.page}></div>
      </div>
      {/* 移动端点击 */}
      <div className={style.menu}>
        menu
      </div>
      {/* 回到顶端 */}
    </div>
  );
}

export default ArticleDisplay;
