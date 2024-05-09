import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomBarNavigation from './BottomBarNavigation';
import BookDetailsScreen from '../screens/BookDetailsScreen';

const Stack = createStackNavigator();

export default function RootNavigation(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomBar">
        <Stack.Screen name="BottomBar" component={BottomBarNavigation} />
        <Stack.Screen name="BookDetailsScreen" component={BookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
