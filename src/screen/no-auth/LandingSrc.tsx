import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
  TEXT_SIZE,
} from '../../constants/constants';
import Btn from '../../components/btn';

type Props = {};

const LandingSrc = (props: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="cover"
      style={styles.image}>
      <View style={{paddingTop: SIZES.large, padding: SIZES.medium, flex: 1}}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Text style={{fontSize: TEXT_SIZE.medium}}>LandingSrc</Text>
        {/* Btn */}
        <Btn text={'Get Started'} />
      </View>
    </ImageBackground>
  );
};

export default LandingSrc;

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
