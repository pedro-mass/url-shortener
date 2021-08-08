import request from "supertest"

const API_URL = "http://localhost:3000"

export function createRequest(url = API_URL) {
  return request(url)
}
