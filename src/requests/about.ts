import About from '@/types/About'
import { fetchApi } from './api'

/** 获取"关于"页面内容 */
export const getAbout = () => fetchApi<About | undefined>('/about', undefined)
