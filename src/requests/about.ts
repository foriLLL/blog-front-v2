import About from '@/types/About'
import Article from '@/types/Article'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { baseURL } from './config'

export const getAbout: () => Promise<About | undefined> = async () => {
  const res: AxiosResponse<ResBody<Article>> = await axios.get(
    baseURL + `/about`,
  )
  if (res.data && res.data.ifSuccessful) {
    return res.data.data
  } else {
    return undefined
  }
}
