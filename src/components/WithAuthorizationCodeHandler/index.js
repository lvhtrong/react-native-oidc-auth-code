import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose, withState, withHandlers, withProps } from 'recompose'
import _ from 'lodash'
import Modal from 'react-native-modal'

import { getCode } from '../../utils'
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
    getCode
  })),
  withState('isVisible', 'setVisible', false),
  withState('url', 'setUrl', undefined),
  withState('callback', 'setCallback', undefined),
  withState('redirectUrl', 'setRedirectUrl', undefined),
  withHandlers({
    openUrl: ({ setVisible, setUrl, setCallback, setRedirectUrl }) => (url, redirectUrl, onSuccess) => {
      setUrl(url)
      setRedirectUrl(redirectUrl)
      setCallback({
        onSuccess
      })
      setVisible(true)
    },
    onNavigationStateChange: ({
      callback,
      setVisible,
      getCode,
      redirectUrl
    }) => webState => {
      const { url } = webState

      if (url.startsWith(redirectUrl)) {
        const code = getCode(url)
        if (_.isFunction(callback.onSuccess)) {
          setVisible(false)
          callback.onSuccess(code)
        }
      }
    }
  }),
  withAuthorizationCodeHandler
)
