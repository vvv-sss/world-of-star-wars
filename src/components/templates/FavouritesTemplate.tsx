import React, {useContext} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FavouritesList} from '../organisms';
import {FavouritesContext} from '../../screens/FavouritesScreen';

const FavouritesTemplate: React.FC = () => {
  const value = useContext(FavouritesContext);

  const {
    favourites,
    maleCount,
    femaleCount,
    otherCount,
    handleResetTheListPress,
  } = value || {};

  return (
    <View flex bg-surface200 useSafeArea>
      <View flex-2 padding-s4>
        {favourites && favourites.length === 0 ? (
          <View>
            <Text text20BL>The list</Text>
            <Text text20BL>is empty</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={handleResetTheListPress}>
            <Text text20BL>Reset</Text>
            <Text text20BL>the list</Text>
          </TouchableOpacity>
        )}
        <View right>
          <Text text30BL>{maleCount} male</Text>
          <Text text30BL>{femaleCount} female</Text>
          <Text text30BL>{otherCount} other</Text>
        </View>
      </View>
      <View flex-3>
        <FavouritesList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  one: {},
  two: {},
});

export default FavouritesTemplate;
