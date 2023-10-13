import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavouritesScreen, HomeScreen, SearchScreen} from '../../screens';
import {Colors} from 'react-native-ui-lib';
import {AppNavigatorParamList} from '../../types';

const Tab = createBottomTabNavigator<AppNavigatorParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: Colors.surface100,
        tabBarActiveBackgroundColor: Colors.surface200,
        tabBarInactiveTintColor: '#f8ca12',
        tabBarActiveTintColor: '#ffffff',
        tabBarIconStyle: {marginTop: 4},
        tabBarLabelStyle: {
          fontSize: 13,
          color: Colors.surface600,
          paddingBottom: 3,
        },
        tabBarStyle: {
          height: 100,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          borderTopWidth: 1,
          padding: 0,
          borderTopColor: Colors.surface600,
          backgroundColor: Colors.surface100,
        },
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
