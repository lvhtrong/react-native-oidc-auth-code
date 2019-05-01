import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { withAuthorizationCodeHandler } from 'react-native-oidc-auth-code'

class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Button
          title="Open Url"
          onPress={() => {
            this.props.openUrl(
              'PLACE_YOUR_URL_HERE',
              code => {
                console.log('code', code)
              },
              error => {
                console.log('error', error)
              }
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withAuthorizationCodeHandler(App)
