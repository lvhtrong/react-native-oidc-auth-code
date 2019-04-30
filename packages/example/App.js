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
            console.log('open button press')
            this.props.openUrl('https://google.com')
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
