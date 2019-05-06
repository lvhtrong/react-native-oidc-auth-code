import { getCode, getRedirectUrl, getError } from './index'

describe('utils', () => {
  describe('getCode', () => {
    it('should return code', () => {
      const url = 'https://abc.com?code=abcxyz'
      const code = getCode(url)
      expect(code).toEqual('abcxyz')
    })

    it('should return undefined', () => {
      const url = 'https://abc.com'
      const code = getCode(url)
      expect(code).toEqual(undefined)
    })
  })

  describe('getRedirectUrl', () => {
    it('should return redirect url', () => {
      const url =
        'https://abc.com?code=abcxyz&redirect_uri=https://redirect.com'
      const redirectUrl = getRedirectUrl(url)
      expect(redirectUrl).toEqual('https://redirect.com')
    })
  })

  describe('getError', () => {
    it('should return error', () => {
      const url =
        'https://abc.com?error=error&error_description=description&error_uri=uri'
      const error = getError(url)
      expect(error).toEqual({
        error: 'error',
        errorDescription: 'description',
        errorUri: 'uri'
      })
    })
  })
})
