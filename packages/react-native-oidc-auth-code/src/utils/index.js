import parse from 'url-parse'

export const getCode = url => {
  const parts = parse(url, true)
  return parts && parts.query && parts.query['code']
}
