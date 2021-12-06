import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';

class Screen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Screen</Text>
      </View>
    );
  }
}

class AuthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Auth Screen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('App')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SomeStackNavigator = createStackNavigator({
  ScreenA: Screen,
  ScreenB: Screen,
});

const AppStack = createDrawerNavigator({
  StackA: {
    name: 'StackA',
    screen: SomeStackNavigator,
  },
  StackB: {
    name: 'StackB',
    screen: SomeStackNavigator,
  },
});

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
