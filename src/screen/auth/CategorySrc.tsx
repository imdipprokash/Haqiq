import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';

type Props = {};

const CategorySrc = (props: Props) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgImageStyle}
      source={require('../../../assets/images/background.png')}>
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Text>CategorySrc</Text>
      </View>
    </ImageBackground>
  );
};

export default CategorySrc;

const styles = StyleSheet.create({
  bgImageStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
