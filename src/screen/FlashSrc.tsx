import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FlashSrc = ({
  setShowFlashScreen,
}: {
  setShowFlashScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/images/background.png')}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <LottieView
        style={{
          width: wp(60),
          height: hp(58),
        }}
        source={require('../../assets/lottie/Landing.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          setShowFlashScreen(false);
        }}
      />
    </ImageBackground>
  );
};

export default FlashSrc;

const styles = StyleSheet.create({});
