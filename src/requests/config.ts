const port = process.env.NEXT_PUBLIC_PORT || 8080
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://foril.space/'

const normalizedBackendUrl = backendURL.endsWith('/')
  ? backendURL.substring(0, backendURL.length - 1) + ':' + port + '/'
  : backendURL + ':' + port + '/'

const hostname = normalizedBackendUrl.split('://')[1].split(':')[0]
const baseURL = normalizedBackendUrl + 'api'
const staticURL = normalizedBackendUrl + 'static'

export { backendURL, baseURL, staticURL, port, hostname }
