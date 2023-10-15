import React, {useContext} from 'react';
import {Colors, Spacings, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {extractIdFromUrl} from '../../../utils';
import {FontIcon} from '../../atoms';
import {HomeContext} from '../../../screens/HomeScreen';
import {ListItem} from '../../molecules';

const PeopleList: React.FC = () => {
  const value = useContext(HomeContext);

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
              index={extractIdFromUrl(item.url) ?? ' '}
              title={item.name}
              icon={
                <FontIcon
                  name={isFavorite ? 'heart-filled' : 'heart-stroked'}
                  size={24}
                  color={Colors.cashmere200}
                />
              }
              handleTitlePress={() =>
                handleListItemNamePress?.({item, comingScreen: 'HomeScreen'})
              }
              handleIconPress={handleListItemIconPress}
            />
            {people && people.length - 1 !== index && (
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

export default PeopleList;
