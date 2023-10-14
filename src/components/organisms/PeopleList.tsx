import React, {useContext} from 'react';
import {Colors, Spacings, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HomeContext} from '../../screens/HomeScreen';
import {extractNumberFromUrl} from '../../utils';
import {FontIcon} from '../atoms';

const PeopleList: React.FC = () => {
  const data = useContext(HomeContext);

  const {
    people,
    favourites,
    count,
    handleListItemNamePress,
    handleListItemHeartIconPress,
    handleNextPress,
    handlePreviousPress,
  } = data || {};

  const renderHeader = () => {
    return (
      <View flex paddingH-s4 marginT-s2>
        {count && <Text>from {count}</Text>}
        <View row spread>
          <TouchableOpacity onPress={handlePreviousPress}>
            <Text>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity marginL-s2 onPress={handleNextPress}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlashList
      ListHeaderComponent={renderHeader}
      data={people}
      keyExtractor={item => item.url}
      renderItem={({item}) => {
        let isFavorite = false;

        if (favourites) {
          isFavorite = favourites[item.url] ? true : false;
        }

        return (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemNameContainer}
              onPress={() => handleListItemNamePress?.(item)}>
              <Text text40T marginR-s3>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartIconContainer}
              onPress={() => handleListItemHeartIconPress?.(item)}>
              <FontIcon
                name={isFavorite ? 'heart-filled' : 'heart-stroked'}
                size={24}
              />
            </TouchableOpacity>
          </View>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacings.s4,
    marginBottom: Spacings.s2,
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
