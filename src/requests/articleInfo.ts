import ArticleInfo from '@/types/ArticleInfo'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { apiURL } from './config'

export const getAllArticleInfos: () => Promise<ArticleInfo[]> = async () => {
  try {
    const res: AxiosResponse<ResBody<ArticleInfo[]>> = await axios.get(
      apiURL + '/articleInfo',
    )
    if (res.data && res.data.ifSuccessful) {
      return res.data.data
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}

export const getAllArticleInfosByCateName: (
  cateName: string,
) => Promise<ArticleInfo[]> = async cateName => {
  try {
    const res: AxiosResponse<ResBody<ArticleInfo[]>> = await axios.get(
      apiURL + `/articleInfo/${encodeURIComponent(cateName)}`,
    )
    if (res.data && res.data.ifSuccessful) {
      return res.data.data
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}
