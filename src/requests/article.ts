import Article from '@/types/Article'
import { fetchApi } from './api'

/** 获取指定分类下的指定文章 */
export const getArticle = (cateName: string, title: string) =>
  fetchApi<Article | undefined>(
    `/article/${encodeURIComponent(cateName)}/${encodeURIComponent(title)}`,
    undefined,
  )
