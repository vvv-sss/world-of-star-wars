import * as React from 'react';
import {Colors} from 'react-native-ui-lib';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigatorParamList} from '../../types';
import {FavouritesScreen, HomeScreen, SearchScreen} from '../../screens';
import {FontIcon} from '../../components/atoms';

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

type IconItem = {
  name: string;
  color: string;
  size: number;
  focused: boolean;
};

const BottomNavigator: React.FC = () => {
  const renderIcon = (data: IconItem) => {
    const {name, color, size, focused} = data;

    return (
      <FontIcon
        name={name}
        color={focused ? color : Colors.bluewood400}
        size={size}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: Colors.bluewood100,
        tabBarInactiveTintColor: Colors.cashmere300,
        tabBarActiveTintColor: Colors.cashmere300,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 1,
          padding: 0,
          borderTopColor: Colors.rgba(Colors.bluewood400, 0.5),
          backgroundColor: Colors.bluewood100,
        },
        headerShown: false,
        unmountOnBlur: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            renderIcon({name: 'home', color, size, focused}),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            renderIcon({name: 'search', color, size: 30, focused}),
        }}
      />
      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            renderIcon({
              name: 'favorites-2',
              color,
              size: 35,
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
