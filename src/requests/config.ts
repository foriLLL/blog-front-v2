const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/'
const normalizedBackendUrl = backendUrl.endsWith('/')
  ? backendUrl
  : backendUrl + '/'
export const baseURL = normalizedBackendUrl + 'api'
export const staticURL = normalizedBackendUrl + 'static'
