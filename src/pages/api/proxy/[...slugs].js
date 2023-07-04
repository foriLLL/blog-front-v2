import { apiURL } from '../../../requests/config'
import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { slugs } = req.query
    const backendUrl = `${apiURL}/${slugs.join('/')}`
    console.log('backendUrl: ', backendUrl)

    // 使用axios或其他库来发送请求
    const response = await axios.get(backendUrl)
    // 获取后端的Content-Type（通常是 image/jpeg, image/png等）
    const contentType = response.headers['content-type']
    res.setHeader('Content-Type', contentType)

    res.send(response.data)
  } catch (e) {
    console.log(e)
    res.status(500).send('Error')
  }
}
