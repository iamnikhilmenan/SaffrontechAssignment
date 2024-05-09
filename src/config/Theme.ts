import {Dimensions} from 'react-native';

interface ThemeColors {
  black: string;
  white: string;
  grey: string;
}

interface ThemeSize {
  default: number;
  width: number;
  height: number;
}

interface ThemeFont {
  primary: number;
  secondary: number;
}

interface Theme {
  COLORS: ThemeColors;
  SIZE: ThemeSize;
  FONT: ThemeFont;
}

const THEME: Theme = {
  COLORS: {
    black: '#000',
    white: '#fff',
    grey: '#808080',
  },
  SIZE: {
    default: 100.0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  FONT: {
    primary: 18,
    secondary: 14,
  },
};

export default THEME;
