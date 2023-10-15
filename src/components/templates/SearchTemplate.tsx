import React, {useContext} from 'react';
import {View, Text, Spacings, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {SearchContext} from '../../screens/SearchScreen';
import {SearchList} from '../organisms';
import {Button, SearchInput} from '../molecules';
import {ErrorView} from '../atoms';

const SearchTemplate: React.FC = () => {
  const value = useContext(SearchContext);

  const {
    searchValue,
    nextPage,
    previousPage,
    isLoading,
    error,
    handleSearchValueChange,
    handleArrowLeftPress,
    handleArrowRightPress,
    handleRetryPress,
  } = value || {};

  return (
    <View flex bg-cashmere100 useSafeArea>
      <SearchInput
        value={searchValue}
        onChangeText={handleSearchValueChange}
        placeholder="Name"
      />
      <View style={styles.listContainer}>
        {!searchValue && (
          <View flex centerV>
            <Text text30M cashmere200 center>
              Explore the Galaxy of Characters
            </Text>
          </View>
        )}
        {isLoading && (
          <Text text70 cashmere200 marginL-s4>
            Loading...
          </Text>
        )}
        {error && (
          <ErrorView
            errorMessage={error}
            marginL={Spacings.s4}
            handleRetryPress={handleRetryPress}
          />
        )}
        <View row margin-s4>
          {previousPage && (
            <Button
              iconName="arrow-left"
              handleButtonPress={handleArrowLeftPress}
              toggleColors
            />
          )}
          <View width={Spacings.s4} />
          {nextPage && (
            <Button
              iconName="arrow-right"
              handleButtonPress={handleArrowRightPress}
              toggleColors
            />
          )}
        </View>
        <SearchList />
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

export default SearchTemplate;
