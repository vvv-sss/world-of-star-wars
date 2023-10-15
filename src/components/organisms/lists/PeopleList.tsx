import React, {useContext} from 'react';
import {Colors, Spacings, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {extractIdFromUrl} from '../../../utils';
import {FontIcon} from '../../atoms';
import {HomeContext} from '../../../screens/HomeScreen';

const PeopleList: React.FC = () => {
  const value = useContext(HomeContext);

  const {
    people,
    favourites,
    handleListItemNamePress,
    handleListItemHeartIconPress,
  } = value || {};

  return (
    <FlashList
      data={people}
      keyExtractor={item => item.url}
      renderItem={({item, index}) => {
        let isFavorite = false;

        if (favourites) {
          isFavorite = favourites[item.url] ? true : false;
        }

        return (
          <>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.itemNameContainer}
                onPress={() => handleListItemNamePress?.(item)}>
                <Text text40T marginR-s3>
                  {extractIdFromUrl(item.url)}.
                </Text>
                <Text text40T marginR-s3>
                  {item.name}
                </Text>
              </TouchableOpacity>
              <View flex />
              <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => handleListItemHeartIconPress?.(item)}>
                <FontIcon
                  name={isFavorite ? 'heart-filled' : 'heart-stroked'}
                  size={24}
                  color={isFavorite ? Colors.surface500 : Colors.surface600}
                />
              </TouchableOpacity>
            </View>
            {people && people.length - 1 !== index && (
              <View
                width="100%"
                height={1}
                backgroundColor={Colors.rgba(Colors.surface600, 0.25)}
                marginB-s2
              />
            )}
          </>
        );
      }}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: Spacings.s4}}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacings.s4,
  },
  itemNameContainer: {
    flexDirection: 'row',
  },
  heartIconContainer: {
    alignItems: 'flex-end',
  },
});

export default PeopleList;
