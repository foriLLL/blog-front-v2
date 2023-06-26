import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import { baseURL } from './config'

export const getNickname: () => Promise<string> = async () => {
  const res: AxiosResponse<ResBody<string>> = await axios.get(
    baseURL + `/meta/nickname`,
  )
  if (res.data && res.data.ifSuccessful) {
    return res.data.data
  } else {
    return ''
  }
}
