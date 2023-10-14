import * as React from 'react';
import {Colors, View} from 'react-native-ui-lib';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {AppNavigatorParamList} from '../../types';
import {FavouritesScreen, HomeScreen, SearchScreen} from '../../screens';
import {FontIcon} from '../../components/atoms';

const Tab = createBottomTabNavigator<AppNavigatorParamList>();

type IconItem = {
  name: string;
  color: string;
  size: number;
  focused: boolean;
};

const AppNavigator: React.FC = () => {
  const renderIcon = (data: IconItem) => {
    const {name, color, size, focused} = data;

    return (
      <View
        style={[
          styles.iconContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {borderColor: focused ? Colors.surface600 : 'transparent'},
        ]}>
        <FontIcon name={name} color={color} size={size} />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: Colors.surface100,
        tabBarInactiveTintColor: Colors.surface600,
        tabBarActiveTintColor: Colors.surface600,
        tabBarStyle: {
          height: 100,
          borderTopWidth: 1,
          padding: 0,
          borderTopColor: Colors.surface600,
          backgroundColor: Colors.surface100,
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
          tabBarIcon: ({color, size, focused}) =>
            renderIcon({name: 'home', color, size, focused}),
        }}
      />
      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            renderIcon({name: 'home', color, size, focused}),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
