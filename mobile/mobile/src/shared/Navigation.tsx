import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { Login } from '../features/auth/scenes/Login';
import { BootstrapContainer } from '../core/bootstrap/BootstrapContainer';
import { HomeScreen } from '../features/hello/scenes/Hello';
import { Tasks } from '../features/tasks/Tasks';

class OtherScreen extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to OtherScreen!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    )
  }
}

const AppStack = createStackNavigator({ Home: Tasks, Other: OtherScreen })
const AuthStack = createStackNavigator({ Login })

export const Navigation = createAppContainer(createSwitchNavigator(
  {
    Bootstrap: BootstrapContainer,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Bootstrap',
  }
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
