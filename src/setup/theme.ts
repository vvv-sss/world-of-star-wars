import {Dictionary} from 'react-native-ui-lib/src/typings/common';

type Theme = {
  colors: {
    [key: string]: string;
  };
  spacings: Dictionary<number>;
};

export const theme: Theme = {
  colors: {
    cashmere100: '#b89882',
    cashmere200: '#e6bea3',
    cashmere300: '#e9c5ac',
    cashmere400: '#eed2bf',
    cashmere500: '#f3dfd1',
    cashmere600: '#f8ece3',
    cashmere700: '#fdf9f6',
    bluewood100: '#1c2b35',
    bluewood200: '#263a46',
    bluewood300: '#2f4858',
    bluewood400: '#445a69',
    bluewood500: '#6d7f8a',
    bluewood600: '#97a4ac',
    bluewood700: '#c1c8cd',
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
