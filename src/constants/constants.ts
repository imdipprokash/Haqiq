import {Dimensions, PixelRatio, Platform} from 'react-native';

export const BASE_URL = 'https://api.zevello.com/api';

export const SIZES = {
  small: 10,
  medium: 20,
  large: 50,
  extraLarge: 60,
};
export const TEXT_SIZE = {
  small: 10,
  medium: 18,
  large: 25,
  extraLarge: 32,
};

export const COLORS = {};

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const layouts = {
  borderRadius: 16,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  spacing: 12,
  cardsGap: 12,
};

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
