import ArticleCate from '@/types/ArticleCate'
import { fetchApi } from './api'

/** 获取所有文章分类 */
export const getAllArticleCates = () =>
  fetchApi<ArticleCate[]>('/articleCate', [])
