import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {onPress: () => void};

const NoInternet = ({onPress}: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/images/NoNewsBg.png')}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.containerStyle}>
        <Image
          source={require('../../assets/images/NoInternet.png')}
          style={{alignSelf: 'center', width: wp(17), height: hp(9)}}
          resizeMode="cover"
        />
        <Text style={styles.titleTextStyle}>No Internet</Text>
        <View>
          <Text style={styles.textStyle}>
            You're offline—check your internet{' '}
          </Text>
          <Text style={styles.textStyle}>or refresh once reconnected.</Text>
        </View>
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: '#fff',
            width: wp(50),
            alignSelf: 'center',
            marginTop: hp(0),
            height: hp(7),
            borderRadius: wp(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.btnTextStyle}>Please Try Again</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  containerStyle: {
    margin: 'auto',
    width: wp(80),
    height: hp(31.5),
    borderRadius: wp(3),
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: hp(3),
    rowGap: hp(2),
  },
  titleTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp(5.5),
    fontFamily: 'Product Sans Bold',
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp(4.5),
    fontFamily: 'Product Sans Regular',
    lineHeight: hp(2.9),
  },
  btnTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: wp(5),

    fontFamily: 'Product Sans Regular',
  },
});
