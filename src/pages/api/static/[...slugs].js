import { staticURL } from '@/requests/config'
import axios from 'axios'

export default async function handler(req, res) {
  const { slugs } = req.query
  const backendImageUrl = `${staticURL}/${slugs.join('/')}`

  // 使用axios或其他库来发送请求到你的后端并获取图片资源
  const response = await axios.get(backendImageUrl, {
    responseType: 'arraybuffer',
  })
  // 获取后端的Content-Type（通常是 image/jpeg, image/png等）
  const contentType = response.headers['content-type']

  // 响应Next.js的请求并返回图片数据
  res.setHeader('Content-Type', contentType)
  res.send(Buffer.from(response.data, 'binary'))
}
