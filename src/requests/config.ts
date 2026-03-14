/**
 * 后端 API 地址配置
 *
 * 仅在 SSR（getServerSideProps）中使用，不会暴露到客户端。
 * - Docker Compose 中通过环境变量传入后端服务地址
 * - 本地开发默认指向 localhost:8081
 */
const backendHost = process.env.BACKEND_URL || 'http://localhost'
const backendPort = process.env.BACKEND_PORT || '8081'

/** API 请求基础 URL，如 http://backend:8081/api */
export const apiURL = `${backendHost}:${backendPort}/api`

/** 静态资源基础 URL，如 http://backend:8081/static */
export const staticURL = `${backendHost}:${backendPort}/static`
