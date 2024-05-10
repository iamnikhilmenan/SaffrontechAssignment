import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/Fontisto';
import SearchScreen from '../screens/SearchScreen';
import THEME from '../config/Theme';

interface TabBarIconProps {
  focused: boolean;
}

const BottomBar = createMaterialBottomTabNavigator();

export default function BottomBarNavigation(): ReactElement {
  return (
    <BottomBar.Navigator
      initialRouteName="Search"
      barStyle={styles.barStyle}
      activeIndicatorStyle={styles.activeIndicatorStyle}
      labeled={false}
      sceneAnimationType="shifting">
      <BottomBar.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}: TabBarIconProps) => (
            <View style={styles.iconContainer}>
              <Icon
                name="search"
                size={18}
                color={
                  focused ? THEME.COLORS.white : THEME.COLORS.secondaryBlue
                }
              />
              {focused && <Text style={styles.labelText}>Search</Text>}
            </View>
          ),
        }}
      />
      <BottomBar.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}: TabBarIconProps) => (
            <View style={styles.iconContainer}>
              <Icon
                name="favorite"
                size={18}
                color={
                  focused ? THEME.COLORS.white : THEME.COLORS.secondaryBlue
                }
              />
              {focused && <Text style={styles.labelText}>Favorite</Text>}
            </View>
          ),
        }}
      />
    </BottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: THEME.COLORS.primaryBlue,
    overflow: 'hidden',
    borderRadius: THEME.SIZE.default,
    marginHorizontal: THEME.SIZE.width / 20,
    paddingHorizontal: THEME.SIZE.width / 20,
    position: 'absolute',
    bottom: THEME.SIZE.width / 20,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: THEME.COLORS.secondaryBlue,
  },
  activeIndicatorStyle: {
    backgroundColor: THEME.COLORS.secondaryBlue,
    width: THEME.SIZE.width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    width: THEME.SIZE.width / 3.5,
    overflow: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: THEME.COLORS.white,
  },
});
