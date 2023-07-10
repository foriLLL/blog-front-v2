import Article from '@/types/Article'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { apiURL } from './config'

export const getArticle: (
  cateName: string,
  title: string,
) => Promise<Article | undefined> = async (cateName, title) => {
  try {
    const res: AxiosResponse<ResBody<Article>> = await axios.get(
      apiURL +
        `/article/${encodeURIComponent(cateName)}/${encodeURIComponent(title)}`,
    )
    if (res.data && res.data.ifSuccessful) {
      return res.data.data
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
}
