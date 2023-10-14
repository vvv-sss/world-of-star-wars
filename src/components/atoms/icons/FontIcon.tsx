import React from 'react';
import {ViewStyle} from 'react-native';
import BaseIcon from './BaseIcon';

type Props = {
  name: string;
  size: number;
  color?: string;
  style?: ViewStyle;
}

const FontIcon: React.FC<Props> = ({name, size, color, style}) => {
  return (
    <BaseIcon
      name={name}
      size={size}
      color={color}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{...style, lineHeight: size, textAlign: 'center'}}
    />
  );
};

export default FontIcon;
