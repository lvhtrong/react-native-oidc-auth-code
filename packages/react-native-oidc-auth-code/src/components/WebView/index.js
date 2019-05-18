import React from 'react'
import { View, TouchableOpacity, WebView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import SafeAreaView from 'react-native-safe-area-view'

const AuthCodeWebView = ({
  onClosePress,
  url,
  onNavigationStateChange,
  onRef
}) => (
  <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
    <View
      style={[
        {
          height: 44,
          backgroundColor: 'black'
        }
      ]}
    >
      <View style={{ height: '100%', aspectRatio: 1 }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={onClosePress}
        >
          <Icon
            backgroundColor="transparent"
            size={28}
            color="white"
            name="md-close"
          />
        </TouchableOpacity>
      </View>
    </View>
    <WebView
      ref={onRef}
      source={{ uri: url }}
      onNavigationStateChange={onNavigationStateChange}
      startInLoadingState
    />
  </SafeAreaView>
)

AuthCodeWebView.propTypes = {
  onClosePress: PropTypes.func,
  url: PropTypes.string,
  onNavigationStateChange: PropTypes.func,
  onRef: PropTypes.func
}

export default AuthCodeWebView
