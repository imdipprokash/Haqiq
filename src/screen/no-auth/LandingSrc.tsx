import {
  Animated,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH, SIZES} from '../../constants/constants';
import Btn from '../../components/btn';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import notifee from '@notifee/react-native';

type Props = {};

const LandingSrc = (props: Props) => {
  const {t, i18n} = useTranslation();
  const nav = useNavigation<any>();

  const logoOpacity = useRef(new Animated.Value(0)).current;

  const HandlePermission = async () => {
    await notifee.requestPermission();
  };

  useEffect(() => {
    HandlePermission();
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      resizeMode="cover"
      imageStyle={{opacity: 1}}
      style={styles.image}>
      <View style={{paddingTop: SIZES.large, padding: SIZES.medium, flex: 1}}>
        <StatusBar translucent backgroundColor={'transparent'} />
        {/* Btn */}
        <Animated.Image
          source={require('../../../assets/images/splash-icon.png')}
          style={[styles.appLogo, {opacity: logoOpacity}]}
        />
        <View
          style={[
            styles.bottom,
            {
              gap: i18n.language === 'en' ? hp(2) : 15,
              bottom: i18n.language === 'en' ? '13%' : '7%',
            },
          ]}>
          <Text
            style={[
              styles.taglineHighlight,
              {
                fontSize: i18n.language === 'en' ? wp(7) : 25,
                fontFamily: 'Product Sans Bold',
              },
            ]}>
            {t('landingSrc.onboarding_heading_1')}
          </Text>
          <Text
            style={[
              styles.taglineHighlight,
              {
                fontSize: i18n.language === 'en' ? wp(7) : 25,
                fontFamily: 'Product Sans Bold',
              },
            ]}>
            {t('landingSrc.onboarding_heading_2')}
          </Text>

          <Animated.View>
            <Btn
              text={t('landingSrc.onboarding_button')}
              onPress={() => {
                // i18n.changeLanguage('en');
                nav.navigate('LanguageSrc');
              }}
            />
          </Animated.View>

          <View
            style={{
              alignSelf: 'center',
            }}>
            <Text
              style={[
                styles.termsText,
                {
                  fontFamily: 'Product Sans Bold',
                  fontSize: i18n.language === 'en' ? wp(3.5) : 13,
                },
              ]}>
              {t('landingSrc.onboarding_terms')}{' '}
            </Text>
            <Pressable
              onPress={() => {
                Linking.openURL('https://haqiq.co/terms-condition');
              }}>
              <Text
                style={[
                  styles.termsText,
                  {
                    fontFamily: 'Product Sans Bold',
                    fontSize: i18n.language === 'en' ? wp(3.5) : 13,
                    borderBottomColor: 'white',
                    textDecorationLine: 'underline',
                  },
                ]}>
                {t('landingSrc.clickable')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LandingSrc;

const styles = StyleSheet.create({
  appLogo: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '85%',
    height: '23%',
    objectFit: 'contain',
    alignSelf: 'center',
    marginTop: hp(34.5),
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  taglineHighlight: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: hp(4),
  },
  bottom: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    margin: 'auto',
    alignSelf: 'center',
  },

  termsText: {
    color: '#fff',
    textAlign: 'center',
  },
});
