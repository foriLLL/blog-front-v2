const port = process.env.NEXT_PUBLIC_PORT || 8080
// 目前不使用 proxy + nginx 来转发请求，所以这里的 backendURL 需要指向后端服务的地址
const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://139.224.101.14/'
// const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/'

const normalizedBackendUrl = backendURL.endsWith('/')
  ? backendURL.substring(0, backendURL.length - 1) + ':' + port + '/'
  : backendURL + ':' + port + '/'

const hostname = normalizedBackendUrl.split('://')[1].split(':')[0]
const apiURL = normalizedBackendUrl + 'api'
const staticURL = normalizedBackendUrl + 'static'

export { backendURL, apiURL, staticURL, port, hostname }
