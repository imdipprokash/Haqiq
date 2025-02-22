import {
  Animated,
  ImageBackground,
  Linking,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from '../../constants/constants';
import Btn from '../../components/btn';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const LandingSrc = (props: Props) => {
  const {t, i18n} = useTranslation();
  const nav = useNavigation<any>();

  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
              gap: i18n.language === 'en' ? normalize(18) : 15,
              bottom: i18n.language === 'en' ? '13%' : '7%',
            },
          ]}>
          <Text
            style={[
              styles.taglineHighlight,
              {
                fontSize: i18n.language === 'en' ? 30 : 25,
                fontFamily:
                  i18n.language === 'en'
                    ? 'Product Sans Bold'
                    : 'Noto-Kufi-Arabic',
              },
            ]}>
            {t('landingSrc.onboarding_heading_1')}
          </Text>
          <Text
            style={[
              styles.taglineHighlight,
              {
                fontSize: i18n.language === 'en' ? 30 : 25,
                fontFamily:
                  i18n.language === 'en'
                    ? 'Product Sans Bold'
                    : 'Noto-Kufi-Arabic',
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
                  fontFamily:
                    i18n.language === 'en'
                      ? 'Product Sans Regular'
                      : 'Noto-Kufi-Arabic',
                  fontSize: i18n.language === 'en' ? normalize(13) : 13,
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
                    fontFamily:
                      i18n.language === 'en'
                        ? 'Product Sans Regular'
                        : 'Noto-Kufi-Arabic',
                    fontSize: i18n.language === 'en' ? normalize(13) : 13,
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
    marginTop: '82%',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  taglineHighlight: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 45,
  },
  bottom: {
    position: 'absolute',
    display: 'flex',

    width: '100%',
    margin: 'auto',
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: '#000',
    fontSize: normalize(16),
    textAlign: 'center',
    // lineHeight: deviceLanguage === "en" ? 20 : 25,
  },
  termsText: {
    color: '#fff',

    textAlign: 'center',
  },
});
