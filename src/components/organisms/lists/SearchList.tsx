import React, {useContext} from 'react';
import {Colors, Spacings} from 'react-native-ui-lib';
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
      renderItem={({item, index}) => {
        let isFavorite = false;

        if (favourites) {
          isFavorite = favourites[item.url] ? true : false;
        }

        return (
          <>
            <ListItem
              item={item}
              index={'>'}
              title={item.name}
              icon={
                <FontIcon
                  name={isFavorite ? 'heart-filled' : 'heart-stroked'}
                  size={24}
                  color={isFavorite ? Colors.surface500 : Colors.surface600}
                />
              }
              handleTitlePress={handleListItemNamePress}
              handleIconPress={handleListItemIconPress}
            />
            {/* {people && people.length - 1 !== index && (
              <View
                width="100%"
                height={1}
                backgroundColor={Colors.rgba(Colors.surface600, 0.25)}
                marginB-s2
              />
            )} */}
          </>
        );
      }}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: Spacings.s4}}
    />
  );
};

export default SearchList;