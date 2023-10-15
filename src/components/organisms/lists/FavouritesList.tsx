import React, {useContext} from 'react';
import {Colors, Spacings, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {FontIcon} from '../../atoms';
import {FavouritesContext} from '../../../screens/FavouritesScreen';
import {ListItem} from '../../molecules';

const FavouritesList: React.FC = () => {
  const value = useContext(FavouritesContext);

  const {favourites, handleListItemNamePress, handleListItemIconPress} =
    value || {};

  return (
    <FlashList
      data={favourites}
      keyExtractor={item => item.url}
      renderItem={({item, index}) => {
        return (
          <>
            <ListItem
              item={item}
              index={index + 1}
              title={item.name}
              icon={
                // XXX add cross icon
                <FontIcon
                  name="arrow-right"
                  size={24}
                  color={Colors.cashmere200}
                />
              }
              handleTitlePress={() =>
                handleListItemNamePress?.({
                  item,
                  comingScreen: 'FavouritesScreen',
                })
              }
              handleIconPress={handleListItemIconPress}
            />
            {favourites &&
              (favourites.length - 1 !== index || favourites.length === 1) && (
                <View
                  width="100%"
                  height={1}
                  backgroundColor={Colors.rgba(Colors.bluewood400, 0.25)}
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

export default FavouritesList;
