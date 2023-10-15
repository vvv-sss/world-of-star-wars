import React, {useContext} from 'react';
import {View, Text, Spacings, Colors} from 'react-native-ui-lib';
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
    <View flex bg-cashmere100 useSafeArea>
      <View row spread centerV padding-s4>
        <View flex>
          {favourites && favourites.length === 0 ? (
            <>
              <Text text30BO bluewood100>
                The list
              </Text>
              <Text text30BO bluewood100>
                is empty
              </Text>
            </>
          ) : (
            <TouchableOpacity onPress={handleResetTheListPress}>
              <Text text30BO bluewood100>
                Tap here
              </Text>
              <Text text30BO bluewood100>
                to Reset
              </Text>
              <Text text30BO bluewood100>
                the list
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View flex right>
          <Text text30BO bluewood100>
            {maleCount} male
          </Text>
          <Text text30BO bluewood100>
            {femaleCount} female
          </Text>
          <Text text30BO bluewood100>
            {otherCount} other
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {favourites && favourites.length === 0 && (
          <View flex centerV paddingH-s4>
            <Text text30M cashmere200 center>
              Favorite characters await you to be added!
            </Text>
          </View>
        )}
        <FavouritesList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: Spacings.s6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.bluewood100,
  },
});

export default FavouritesTemplate;
