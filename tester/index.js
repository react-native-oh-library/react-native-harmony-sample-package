import {AppRegistry, View, Text} from 'react-native';
import {name as appName} from './app.json';
import React from 'react'

const App = () => {
  return <View style={{paddingTop: 50, backgroundColor: 'lightblue', flex: 1}}>
    <Text>111111111122222222223333333333333333333333 111111111122222222223333333333333333333333 </Text>
  </View>
}

AppRegistry.registerComponent(appName, () => App);