// Backend API URL - used only in SSR (getServerSideProps)
// In Docker Compose, the frontend container accesses the backend via service name
const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost'
const backendPort = process.env.NEXT_PUBLIC_PORT || '8081'
const apiURL = `${backendHost}:${backendPort}/api`
const staticURL = `${backendHost}:${backendPort}/static`

export { apiURL, staticURL }
