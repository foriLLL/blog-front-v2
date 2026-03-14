/**
 * 后端 API 请求工具
 * 统一封装请求逻辑、错误处理和响应解包
 */
import axios from 'axios'
import { apiURL } from './config'

/** 后端统一响应格式 */
interface ApiResponse<T> {
  ifSuccessful: boolean
  data: T
  message?: string
}

/**
 * 通用 API GET 请求
 * 自动解包 ApiResponse，请求失败时返回 fallback 值
 *
 * @param path - API 路径（不含 baseURL），如 '/articleInfo'
 * @param fallback - 请求失败时的默认返回值
 */
export async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await axios.get<ApiResponse<T>>(`${apiURL}${path}`)
    return res.data?.ifSuccessful ? res.data.data : fallback
  } catch {
    return fallback
  }
}
