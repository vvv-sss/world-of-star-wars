import {NavigatorScreenParams} from '@react-navigation/native';
import {People} from './data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  BottomNavigator: NavigatorScreenParams<BottomNavigatorParamList>;
  DetailsScreen: DetailsScreenParams;
};

type BottomNavigatorParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  FavouritesScreen: undefined;
};

type BottomNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  'BottomNavigator'
>;

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailsScreen'
>;

type DetailsScreenParams = {
  item: People;
  comingScreen: keyof BottomNavigatorParamList;
};

export type {
  RootStackParamList,
  BottomNavigatorParamList,
  BottomNavigatorProps,
  DetailsScreenProps,
  DetailsScreenParams,
};
