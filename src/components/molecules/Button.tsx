import React from 'react';
import {Colors} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontIcon} from '../atoms';

const ICON_SIZE = 24;

type Props = {
  iconName?: string;
  toggleColors?: boolean;
  handleButtonPress?: () => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  iconName = 'arrow-right',
  toggleColors = false,
  handleButtonPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: toggleColors
            ? Colors.cashmere100
            : Colors.bluewood100,
        },
      ]}
      onPress={handleButtonPress}
      disabled={disabled}>
      <FontIcon
        name={iconName}
        size={ICON_SIZE}
        color={toggleColors ? Colors.bluewood100 : Colors.cashmere200}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE * 2,
    height: ICON_SIZE * 2,
    borderRadius: 99,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
