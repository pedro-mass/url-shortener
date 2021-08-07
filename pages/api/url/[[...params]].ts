import status from 'http-status'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isValid, error } = validate(req)

  if (!isValid) {
    return res.status(status.BAD_REQUEST).send(error)
  }

  const handler = {
    post: postHandler,
    get: getHandler,
  }[_.lowerCase(req.method)]

  if (!handler) {
    res.setHeader('Allow', ['GET', 'POST'])
    return res
      .status(status.METHOD_NOT_ALLOWED)
      .end(`Method ${req.method} Not Allowed`)
  }

  return handler(req, res)
}

function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.body.url
  const id = saveUrl(url)
  return res.status(status.OK).json({ id })
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = _.first(req.query.params)
  if (id) {
    const url = getUrl(id)
    return res.status(status.OK).json({ id, url })
  }

  const urls = getUrls()
  return res.status(status.OK).json(urls)
}

function validate(req: NextApiRequest) {
  const params = req.query.params || []
  const maxLength = isPost(req) ? 0 : 1
  if (params.length > maxLength) {
    return { isValid: false, error: `Too many query params: ${params}` }
  }

  if (!isPost(req)) {
    return { isValid: true }
  }

  const hasUrl = !_.isUndefined(_.get(req.body, 'url'))
  if (!hasUrl) {
    return { isValid: false, error: `Missing url from body: ${req.body}` }
  }

  return { isValid: true }
}

function isPost(req: NextApiRequest) {
  return getMethod(req) === 'post'
}

function getMethod(req: NextApiRequest) {
  return _.lowerCase(req.method)
}

function getUrls() {
  return []
}

function getUrl(id: string) {
  return 'https://www.google.com'
}

function saveUrl(id: string) {
  return nanoid()
}
