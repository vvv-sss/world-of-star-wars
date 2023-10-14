import React from 'react';
import {Text, Spacings, Colors} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontIcon} from '../atoms';

const ICON_SIZE = 20;

type Props = {
  title?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  showIconSide?: 'left' | 'right';
  handleButtonPress?: () => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  iconName = 'arrow-right',
  iconSize = ICON_SIZE,
  iconColor = Colors.surface600,
  showIconSide,
  handleButtonPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleButtonPress}
      disabled={disabled}>
      {showIconSide === 'left' && (
        <FontIcon name={iconName} size={iconSize} color={iconColor} />
      )}
      {title && (
        <Text
          text70
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginLeft: showIconSide === 'left' ? Spacings.s2 : 0,
            marginRight: showIconSide === 'right' ? Spacings.s2 : 0,
          }}>
          {title}
        </Text>
      )}
      {showIconSide === 'right' && (
        <FontIcon name={iconName} size={ICON_SIZE} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacings.s4,
    paddingVertical: Spacings.s2,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.surface600,
    backgroundColor: Colors.primary600,
  },
});

export default Button;
