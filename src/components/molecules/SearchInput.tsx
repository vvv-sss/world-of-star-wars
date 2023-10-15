import React from 'react';
import {View, Typography, Colors, Spacings} from 'react-native-ui-lib';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {FontIcon} from '../atoms';

type Props = TextInputProps & {};

const SearchInput: React.FC<Props> = props => {
  return (
    <View row centerV>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={Colors.bluewood300}
      />
      <View absR marginR-s4>
        <FontIcon name="search" size={40} color={Colors.bluewood100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingLeft: Spacings.s4,
    paddingRight: Spacings.s10,
    ...Typography.text30,
    color: Colors.bluewood100,
  },
});

export default SearchInput;
