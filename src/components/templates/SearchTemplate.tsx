import React, { useContext } from 'react';
import {View, Text} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import { SearchContext } from '../../screens/SearchScreen';
import { SearchList } from '../organisms';

const SearchTemplate: React.FC = () => {
  const value = useContext(SearchContext);
  
  return (
    <View flex bg-surface100>
      <View flex>
        <SearchList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  one: {},
  two: {},
});

export default SearchTemplate;
