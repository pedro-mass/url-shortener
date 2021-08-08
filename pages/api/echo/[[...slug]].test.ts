import status from "http-status"

import { createRequest } from "../utils/tests"

describe("/api/echo", () => {
  const cases = [
    {
      url: "/api/echo",
      body: { foo: "bar" },
    },
    {
      url: "/api/echo/nested",
      body: { foo: "bar" },
    },
  ]

  it.each(cases)("should return what was sent: %j", (config) => {
    return createRequest()
      .post(config.url)
      .send(config.body)
      .expect(status.OK)
      .then((res) => {
        expect(res.body).toMatchObject(config)
      })
  })
})
