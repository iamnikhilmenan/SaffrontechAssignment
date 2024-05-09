/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';

import RootNavigation from './src/navigation/RootNavigation';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function App(): React.JSX.Element {
  return <RootNavigation />;
}

export default App;
