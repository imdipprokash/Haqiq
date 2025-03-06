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
import Btn from './btn';
import BackButton from './back-button';
import i18n from '../../i18n';

type Props = {onPress: () => void};

const NoFeed = ({onPress}: Props) => {
  return (
    <ImageBackground
      source={require('../../assets/images/NoNewsBg.png')}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BackButton
        bgColor={'#fff'}
        color={'#000'}
        pathName={'CategorySrc'}
        title={i18n.t('homePage.feedType')}
      />
      <View style={styles.containerStyle}>
        <Image
          source={require('../../assets/images/NoFeed.png')}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.titleTextStyle}>Please Try Again</Text>
        <View>
          <Text style={styles.textStyle}>You've seen all the latest feed</Text>
          <Text style={styles.textStyle}>
            refresh now for updates or adjust
          </Text>
          <Text style={styles.textStyle}>your settings to stay in sync</Text>
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
          <Text style={styles.btnTextStyle}>Refresh Feed</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default NoFeed;

const styles = StyleSheet.create({
  containerStyle: {
    margin: 'auto',
    width: wp(80),
    height: hp(33.5),
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
