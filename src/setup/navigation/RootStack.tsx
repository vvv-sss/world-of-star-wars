import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import BottomNavigator from './BottomNavigator';
import {DetailsScreen} from '../../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={BottomNavigator} name="BottomNavigator" />
      <Stack.Screen
        component={DetailsScreen}
        name="DetailsScreen"
        options={{presentation: 'containedTransparentModal'}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
