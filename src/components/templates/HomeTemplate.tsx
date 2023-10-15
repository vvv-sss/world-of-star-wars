import React from 'react';
import {View, Text, Spacings, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {HomeContext} from '../../screens/HomeScreen';
import {PeopleList} from '../organisms';
import {Button} from '../molecules';
import {ErrorView} from '../atoms';

const HomeTemplate: React.FC = () => {
  const value = useContext(HomeContext);

  const {
    totalCount,
    isLoading,
    error,
    handlePreviousPress,
    handleNextPress,
    handleRetryPress,
  } = value || {};

  return (
    <View flex bg-cashmere100 useSafeArea>
      <View>
        <View style={styles.titleContainer}>
          <Text text30BO bluewood100 style={styles.title}>
            You've got a whopping {totalCount} movie characters to check out.
          </Text>
        </View>
        <View flex />
        <View row centerV paddingH-s4 marginB-s2>
          <Button
            iconName="arrow-left"
            handleButtonPress={handlePreviousPress}
          />
          <View width={Spacings.s4} />
          <Button iconName="arrow-right" handleButtonPress={handleNextPress} />
          {isLoading && (
            <Text text70 bluewood100 marginL-s4>
              loading...
            </Text>
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        {error && (
          <ErrorView
            errorMessage={error}
            handleRetryPress={handleRetryPress}
            marginL={Spacings.s4}
          />
        )}
        <PeopleList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacings.s4,
  },
  title: {
    textAlign: 'right',
  },
  listContainer: {
    flex: 1,
    paddingTop: Spacings.s6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.bluewood100,
  },
});

export default HomeTemplate;
