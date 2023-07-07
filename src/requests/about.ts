import About from '@/types/About'
import Article from '@/types/Article'
import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { apiURL } from './config'

export const getAbout: () => Promise<About | undefined> = async () => {
  const res: AxiosResponse<ResBody<Article>> = await axios.get('/proxy/about')
  if (res.data && res.data.ifSuccessful) {
    return res.data.data
  } else {
    return undefined
  }
}
