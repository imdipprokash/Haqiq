import {Dimensions, PixelRatio, Platform} from 'react-native';

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
