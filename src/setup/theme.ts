import {Schemes} from 'react-native-ui-lib';
import {Dictionary} from 'react-native-ui-lib/src/typings/common';

type Theme = {
  colors: Schemes;
  spacings: Dictionary<number>;
};

export const theme: Theme = {
  colors: {
    light: {
      primary100: '#673ab7',
      primary200: '#7a4fbf',
      primary300: '#8c64c8',
      primary400: '#9d79d0',
      primary500: '#ae8fd8',
      primary600: '#bfa5e0',
      surface100: '#ebe9e6',
      surface200: '#d4d2cf',
      surface300: '#a5a3a1',
      surface400: '#767573',
      surface500: '#464645',
      surface600: '#171717',
    },
    dark: {
      primary100: '#673ab7',
      primary200: '#7a4fbf',
      primary300: '#8c64c8',
      primary400: '#9d79d0',
      primary500: '#ae8fd8',
      primary600: '#bfa5e0',
      surface100: '#171717',
      surface200: '#464645',
      surface300: '#767573',
      surface400: '#a5a3a1',
      surface500: '#d4d2cf',
      surface600: '#ebe9e6',
    },
  },
  spacings: {
    s1: 4,
    s2: 8,
    s3: 12,
    s4: 16,
    s5: 20,
    s6: 24,
    s7: 32,
    s8: 40,
    s9: 50,
    s10: 60,
  },
};
