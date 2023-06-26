import ArticleCate from '@/types/ArticleCate'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { baseURL } from './config'

export const getAllArticleCates: () => Promise<ArticleCate[]> = async () => {
  const res: AxiosResponse<ResBody<ArticleCate[]>> = await axios.get(
    baseURL + '/articleCate',
  )
  if (res.data && res.data.ifSuccessful) {
    return res.data.data
  } else {
    return []
  }
}
