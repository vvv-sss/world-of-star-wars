import React, {useContext} from 'react';
import {Colors, Spacings, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontIcon} from '../../atoms';
import {FavouritesContext} from '../../../screens/FavouritesScreen';

const FavouritesList: React.FC = () => {
  const value = useContext(FavouritesContext);

  const {favourites, handleListItemNamePress, handleListItemCrossPress} =
    value || {};

  return (
    <FlashList
      data={favourites}
      keyExtractor={item => item.url}
      renderItem={({item, index}) => {
        return (
          <>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.itemNameContainer}
                onPress={() => handleListItemNamePress?.(item)}>
                <Text text40T marginR-s3>
                  {index + 1}.
                </Text>
                <Text text40T marginR-s3>
                  {item.name}
                </Text>
              </TouchableOpacity>
              <View flex />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => handleListItemCrossPress?.(item)}>
                {/* XXX change icon to cross */}
                <FontIcon name="arrow-up" size={24} color={Colors.surface600} />
              </TouchableOpacity>
            </View>
            {favourites &&
              (favourites.length - 1 !== index || favourites.length === 1) && (
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
  iconContainer: {
    alignItems: 'flex-end',
  },
});

export default FavouritesList;
