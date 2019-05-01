import parse from 'url-parse'

export const getCode = url => {
  const parts = parse(url, true)
  return parts && parts.query && parts.query['code']
}

export const getRedirectUrl = url => {
  const parts = parse(url, true)
  return parts && parts.query && parts.query['redirect_uri']
}

export const getError = url => {
  const parts = parse(url, true)
  if (parts && parts.query) {
    return {
      error: parts.query['error'],
      errorDescription: parts.query['error_description'],
      errorUri: parts.query['error_uri']
    }
  } else {
    return null
  }
}
