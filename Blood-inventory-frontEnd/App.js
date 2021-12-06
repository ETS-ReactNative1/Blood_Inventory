import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { NativeBaseProvider} from 'native-base';

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <NativeBaseProvider >
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NativeBaseProvider>

  );
}

AppRegistry.registerComponent("Blood-inventory-frontEnd", () => App);

