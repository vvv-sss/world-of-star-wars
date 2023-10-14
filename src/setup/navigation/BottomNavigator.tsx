import * as React from 'react';
import {Colors, Spacings, View} from 'react-native-ui-lib';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {BottomNavigatorParamList} from '../../types';
import {FavouritesScreen, HomeScreen, SearchScreen} from '../../screens';
import {FontIcon} from '../../components/atoms';

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

type IconItem = {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  iconContainerStyle?: {};
};

const BottomNavigator: React.FC = () => {
  const renderIcon = (data: IconItem) => {
    const {name, color, size, iconContainerStyle, focused} = data;

    return (
      <View
        style={[
          styles.iconContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {borderColor: focused ? Colors.surface600 : 'transparent'},
        ]}>
        <View style={iconContainerStyle}>
          <FontIcon name={name} color={color} size={size} />
        </View>
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
            renderIcon({name: 'search', color, size: 30, focused}),
        }}
      />
      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            renderIcon({
              name: 'favorites-1',
              color,
              size: 45,
              focused,
              iconContainerStyle: styles.favoriteIconContainer,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Spacings.s1,
    borderBottomWidth: 1,
    marginBottom: Spacings.s3,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 2,
    left: -3,
  },
});

export default BottomNavigator;
