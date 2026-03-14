import ArticleCate from '@/types/ArticleCate'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { apiURL } from './config'

export const getAllArticleCates: () => Promise<ArticleCate[]> = async () => {
  try {
    const res: AxiosResponse<ResBody<ArticleCate[]>> = await axios.get(
      apiURL + '/articleCate',
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
