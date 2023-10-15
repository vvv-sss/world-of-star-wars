import React, {useContext} from 'react';
import {Colors, Spacings, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {FontIcon} from '../../atoms';
import {ListItem} from '../../molecules';
import {SearchContext} from '../../../screens/SearchScreen';

const SearchList: React.FC = () => {
  const value = useContext(SearchContext);

  const {people, favourites, handleListItemNamePress, handleListItemIconPress} =
    value || {};

  return (
    <FlashList
      data={people}
      keyExtractor={item => item.url}
      renderItem={({item}) => {
        let isFavorite = false;

        if (favourites) {
          isFavorite = favourites[item.url] ? true : false;
        }

        return (
          <View marginB-s3>
            <ListItem
              item={item}
              index=""
              title={item.name}
              icon={
                <FontIcon
                  name={isFavorite ? 'heart-filled' : 'heart-stroked'}
                  size={24}
                  color={Colors.cashmere200}
                />
              }
              handleTitlePress={handleListItemNamePress}
              handleIconPress={handleListItemIconPress}
            />
          </View>
        );
      }}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: Spacings.s4}}
    />
  );
};

export default SearchList;
