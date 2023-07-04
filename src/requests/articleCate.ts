import ArticleCate from '@/types/ArticleCate'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'

export const getAllArticleCates: () => Promise<ArticleCate[]> = async () => {
  const res: AxiosResponse<ResBody<ArticleCate[]>> = await axios.get(
    '/proxy/articleCate',
  )
  if (res.data && res.data.ifSuccessful) {
    return res.data.data
  } else {
    return []
  }
}
