import ResBody from '@/types/ResBody'
import axios, { AxiosResponse } from 'axios'
import IconLink from '@/types/IconLink'

export const getNickname: () => Promise<string> = async () => {
  try {
    const res: AxiosResponse<ResBody<string>> = await axios.get(
      `/proxy/meta/nickname`,
    )
    if (res.data && res.data.ifSuccessful) {
      return res.data.data
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

export const getIconLinks: () => Promise<IconLink[]> = async () => {
  try {
    const res: AxiosResponse<ResBody<IconLink[]>> = await axios.get(
      `/proxy/meta/iconlink`,
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
