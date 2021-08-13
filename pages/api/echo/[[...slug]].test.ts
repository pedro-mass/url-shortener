import got from "got"

import { createUrl } from "../utils/tests"

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

  it.each(cases)("should return what was sent: %j", async (config) => {
    const res = await got
      .post(createUrl(config.url), { json: config.body })
      .json()
    expect(res).toMatchObject({
      url: config.url,
      method: "POST",
      body: config.body,
    })
  })
})
