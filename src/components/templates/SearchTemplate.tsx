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
    resultsCount,
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

  const nextPageNumber = nextPage
    ? nextPage.split('')[nextPage?.split('').length - 1]
    : null;

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
        {isLoading && searchValue && (
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
        <View row centerV spread margin-s4>
          <View row>
            {previousPage && searchValue && (
              <Button
                iconName="arrow-left"
                handleButtonPress={handleArrowLeftPress}
                toggleColors
              />
            )}
            <View width={Spacings.s4} />
            {nextPage && searchValue && (
              <Button
                iconName="arrow-right"
                handleButtonPress={handleArrowRightPress}
                toggleColors
              />
            )}
          </View>
          {resultsCount && (
            <View>
              {nextPageNumber && (
                <Text text80BO cashmere200>
                  Page: {parseInt(nextPageNumber, 10) - 1}
                </Text>
              )}
              <Text text70 cashmere200>
                Results: {resultsCount}
              </Text>
            </View>
          )}
        </View>
        {searchValue && <SearchList />}
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
