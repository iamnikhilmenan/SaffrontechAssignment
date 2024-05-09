import React, {ReactElement} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  MaterialBottomTabNavigationProp,
  MaterialBottomTabScreenProps,
} from '@react-navigation/material-bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/Fontisto';
import THEME from '../config/Theme';

const BottomBar = createMaterialBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
}

export default function BottomBarNavigation(): ReactElement {
  return (
    <BottomBar.Navigator initialRouteName="Search">
      <BottomBar.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}: TabBarIconProps) => (
            <Icon
              name="search"
              size={focused ? 32 : 25}
              color={focused ? THEME.COLORS.black : THEME.COLORS.grey}
            />
          ),
        }}
      />
      <BottomBar.Screen
        name="Fav"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="favorite"
              size={focused ? 32 : 25}
              color={focused ? THEME.COLORS.black : THEME.COLORS.grey}
            />
          ),
        }}
      />
    </BottomBar.Navigator>
  );
}
