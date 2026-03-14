import ArticleInfo from '@/types/ArticleInfo'
import { fetchApi } from './api'

/** 获取所有文章摘要 */
export const getAllArticleInfos = () =>
  fetchApi<ArticleInfo[]>('/articleInfo', [])

/** 按分类名获取文章摘要 */
export const getAllArticleInfosByCateName = (cateName: string) =>
  fetchApi<ArticleInfo[]>(`/articleInfo/${encodeURIComponent(cateName)}`, [])
