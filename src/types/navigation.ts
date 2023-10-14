import {NavigatorScreenParams} from '@react-navigation/native';
import {People} from './data';

type RootStackParamList = {
  BottomNavigator: NavigatorScreenParams<BottomNavigatorParamList>;
  DetailsScreen: {item: People};
};

type BottomNavigatorParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  FavouritesScreen: undefined;
};

export type {RootStackParamList, BottomNavigatorParamList};
