import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {HomeContext} from '../../screens/HomeScreen';
import { PeopleList } from '../organisms';

const HomeTemplate: React.FC = () => {
  const data = useContext(HomeContext);

  const {people, count, isLoading, error} = data || {};

  return (
    <View flex bg-surface100 useSafeArea>
      {isLoading && <Text>Loading...</Text>}
      <PeopleList />
    </View>
  );
};

const styles = StyleSheet.create({
  one: {},
  two: {},
});

export default HomeTemplate;
