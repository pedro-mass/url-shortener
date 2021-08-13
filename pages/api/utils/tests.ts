const API_URL = "http://localhost:3000"

export function getServerAddress() {
  return API_URL
}

export function createUrl(route: string) {
  return `${getServerAddress()}${route}`
}
