import _ from "lodash"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = _.pick(req, [
    // 'rawHeaders',
    "url",
    "method",
    "statusCode",
    "statusMessage",
    "cookies",
    "query",
    "previewData",
    "preview",
    "body",
  ])

  res.status(200).send(response)
}
