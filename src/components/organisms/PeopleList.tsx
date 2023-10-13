import React, {useContext} from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HomeContext} from '../../screens/HomeScreen';

const PeopleList: React.FC = () => {
  const data = useContext(HomeContext);

  const {people, count, handleCharNamePress} = data || {};

  const renderListHeader = () => {
    return <View right>{count && <Text>Total: {count}</Text>}</View>;
  };

  return (
    <FlashList
      data={people}
      keyExtractor={(item, index) => `${item.created}-${index}`}
      renderItem={({item, index}) => {
        return (
          <View style={styles.itemContainer}>
            <Text marginR-s3>{index}</Text>
            <TouchableOpacity
              style={styles.itemNameContainer}
              onPress={() => handleCharNamePress?.(item.url)}>
              <Text marginR-s3>{item.name}</Text>
              <Text>^^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartIconContainer}>
              <Text>Hi</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      estimatedItemSize={100}
      ListHeaderComponent={renderListHeader}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface600,
  },
  itemNameContainer: {
    flexDirection: 'row',
  },
  heartIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default PeopleList;
