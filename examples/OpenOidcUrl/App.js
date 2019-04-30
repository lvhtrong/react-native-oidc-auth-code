import React from 'react'
import { StyleSheet, View, Button } from 'react-native'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Button
          title="Open Url"
          onPress={() => {
            console.log('open button press')
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
