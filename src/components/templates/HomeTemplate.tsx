import React from 'react';
import {View, Text, Spacings} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {HomeContext} from '../../screens/HomeScreen';
import {PeopleList} from '../organisms';
import {Button} from '../molecules';
import {ErrorView, LoadingView} from '../atoms';

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
    <View flex bg-surface200 useSafeArea>
      <View flex>
        <View style={styles.titleContainer}>
          <Text text30BL style={styles.title}>
            You've got a whopping {totalCount} movie characters to check out.
          </Text>
        </View>
        <View flex />
        <View row centerV paddingH-s4 marginB-s4>
          <Button
            iconName="arrow-left"
            showIconSide="left"
            handleButtonPress={handlePreviousPress}
          />
          <View width={Spacings.s4} />
          <Button
            iconName="arrow-right"
            showIconSide="right"
            handleButtonPress={handleNextPress}
          />
          {isLoading && <LoadingView marginL={Spacings.s4} />}
        </View>
      </View>
      <View flex>
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
    width: '80%',
    alignSelf: 'flex-end',
    paddingHorizontal: Spacings.s4,
  },
  title: {
    textAlign: 'right',
  },
});

export default HomeTemplate;
