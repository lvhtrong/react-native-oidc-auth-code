import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose, withState, withHandlers, withProps } from 'recompose'
import _ from 'lodash'
import Modal from 'react-native-modal'

import { getCode, getRedirectUrl, getError } from '../../utils'
import AuthCodeWebView from '../WebView'

const withAuthorizationCodeHandler = WrappedComponent => {
  const hocComponent = ({ baseProps, ...props }) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...baseProps} openUrl={props.openUrl} />
      <Modal isVisible={props.isVisible} style={{ margin: 0 }}>
        <AuthCodeWebView
          url={props.url}
          onNavigationStateChange={props.onNavigationStateChange}
          onClosePress={() => props.setVisible(false)}
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
    baseProps: PropTypes.object
  }

  return hocComponent
}

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
        if (_.isFunction(callback.onSuccess)) {
          setVisible(false)
          callback.onSuccess(code)
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
          onError({ error: 'redirect_uri_missing' })
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
    }
  }),
  withAuthorizationCodeHandler
)
