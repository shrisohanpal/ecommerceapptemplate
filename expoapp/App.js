import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import store from './store'
import MainNavigator from './navigation/MainNavigator';

//useScreens();

export default function App() {/*
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello from DKS</Text>
    </View>
  )*/
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}