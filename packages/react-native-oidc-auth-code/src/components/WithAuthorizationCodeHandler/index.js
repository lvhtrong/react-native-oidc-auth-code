import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose, withState, withHandlers, withProps } from 'recompose'
import _ from 'lodash'
import Modal from 'react-native-modal'

import { getCode, getRedirectUrl, getError } from '../../utils'
import AuthCodeWebView from '../WebView'

const withAuthorizationCodeHandler = WrappedComponent => {
  const hocComponent = ({ baseProps, onRef, onCloseButtonPress, ...props }) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...baseProps} openUrl={props.openUrl} />
      <Modal isVisible={props.isVisible} style={{ margin: 0 }}>
        <AuthCodeWebView
          url={props.url}
          onNavigationStateChange={props.onNavigationStateChange}
          onClosePress={onCloseButtonPress}
          onRef={onRef}
        />
      </Modal>
    </View>
  )

  hocComponent.displayName = `withAuthorizationCodeHandler(${
    WrappedComponent.displayName
  })`

  hocComponent.propTypes = {
    openUrl: PropTypes.func,
    isVisible: PropTypes.bool,
    url: PropTypes.string,
    onNavigationStateChange: PropTypes.func,
    setVisible: PropTypes.func,
    baseProps: PropTypes.object,
    onRef: PropTypes.func,
    onCloseButtonPress: PropTypes.func
  }

  return hocComponent
}

let isFinished = false
let webView

export default compose(
  withProps(props => ({
    baseProps: props,
    getCode,
    getRedirectUrl,
    getError
  })),
  withState('isVisible', 'setVisible', false),
  withState('url', 'setUrl', undefined),
  withState('callback', 'setCallback', undefined),
  withState('redirectUrl', 'setRedirectUrl', undefined),
  withHandlers({
    onRedirectUriCalled: ({
      callback,
      setVisible,
      getCode,
      getError
    }) => url => {
      if (/code=/g.test(url)) {
        const code = getCode(url)
        if (_.isString(code)) {
          if (_.isFunction(callback.onSuccess)) {
            setVisible(false)
            callback.onSuccess(code)
          }
        } else {
          if (_.isFunction(callback.onError)) {
            callback.onError({
              code: 'CODE_NOT_FOUND'
            })
          }
        }
      } else if (/error=/g.test(url)) {
        const error = getError(url)
        if (_.isFunction(callback.onError)) {
          setVisible(false)
          callback.onError(error)
        }
      }
    }
  }),
  withHandlers({
    openUrl: ({
      setVisible,
      setUrl,
      setCallback,
      setRedirectUrl,
      getRedirectUrl
    }) => (url, onSuccess, onError) => {
      isFinished = false

      setUrl(url)
      setCallback({
        onSuccess,
        onError
      })

      const redirectUrl = getRedirectUrl(url)
      if (_.isString(redirectUrl)) {
        setRedirectUrl(redirectUrl)
        setVisible(true)
      } else {
        setRedirectUrl(undefined)
        setVisible(true)

        if (_.isFunction(onError)) {
          onError({ code: 'REDIRECT_URI_MISSING' })
        }
      }
    },
    onNavigationStateChange: ({
      onRedirectUriCalled,
      redirectUrl
    }) => webState => {
      const { url } = webState

      if (url.startsWith(redirectUrl)) {
        onRedirectUriCalled(url)
      }

      if (!isFinished && url.startsWith(redirectUrl)) {
        webView && webView.stopLoading()
        isFinished = true
        onRedirectUriCalled(url)
      }
    },
    onRef: () => ref => (webView = ref),
    onCloseButtonPress: ({ callback, setVisible }) => () => {
      setVisible(false)
      if (_.isFunction(callback.onError)) {
        callback.onError({
          code: 'USER_CLOSE_MANUALLY'
        })
      }
    }
  }),
  withAuthorizationCodeHandler
)
