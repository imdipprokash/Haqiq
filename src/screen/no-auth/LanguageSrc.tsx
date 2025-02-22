import {
  Animated,
  I18nManager,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {t} from 'i18next';
import i18n from '../../../i18n';
import Btn from '../../components/btn';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
  normalize,
} from '../../constants/constants';
import {Country, Language} from '../../types/types';
import useGetData from '../../hooks/useGetData';
import useAxios from '../../hooks/useAxios';
import {useAppDispatch} from '../../redux/store';
import {ADD_AUTH, AuthType} from '../../redux/slices/authInfo';

type Props = {};

const LanguageSrc = (props: Props) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const [language, setLanguage] = useState(i18n.language);

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectCountry] = useState<string>();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectLanguage, setSelectedLanguages] = useState<string>();
  const dispatch = useAppDispatch();
  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setLanguage(lng);
    if (lng === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
  };

  const {
    response: countryList,
    loading: countryListLoading,
    error: countyListError,
    getData,
  } = useGetData({
    endPoint: `/countries/?page_size=10&page_number=1&enabled_status=all`,
  });

  const {
    response: languageList,
    loading: languageListLoading,
    error: languageListError,
    getData: getLanguage,
  } = useGetData({
    endPoint: `/countries/${selectedCountry}/languages`,
  });

  const {
    response: authRes,
    loading: authLoading,
    error: authError,
    usePostHandler,
  } = useAxios({
    data: {
      device_id: 'string',
      country_code: selectedCountry,
      language_code: selectLanguage,
    },
    endPoint: '/auth/device/token',
  });
  console.log(authRes && authRes);
  useEffect(() => {
    if (!countryListLoading) {
      setCountries(countryList?.data);
      //   countryList?.data && setSelectCountry(countryList?.data[0]?.code);
    }
    if (languageList) {
      console.log(`/countries/${selectedCountry}/languages`, languageList);
      setLanguages(languageList);
    }
    if (authRes) {
      dispatch(
        ADD_AUTH({
          accessToken: authRes.access_token,
          refreshToken: authRes?.refresh_token,
          countryCode: selectedCountry || 'SA',
          languageCode: selectLanguage || 'ar',
          deviceId: '',
        }),
      );
    }
  }, [countryList, languageList, authRes]);

  useEffect(() => {
    getLanguage();
  }, [selectedCountry]);

  useEffect(() => {
    getData();
    // Create an infinite fade-in, fade-out loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoOpacity, {
          toValue: 1, // Fade in to fully visible
          duration: 800, // Duration of fade-in
          useNativeDriver: true, // Use native driver for performance
        }),
        Animated.timing(logoOpacity, {
          toValue: 0.2, // Fade out to fully transparent
          duration: 800, // Duration of fade-out
          useNativeDriver: true, // Use native driver for performance
        }),
      ]),
    ).start(); // Start the animation loop
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      resizeMode="cover"
      style={[
        styles.image,
        {direction: selectLanguage === 'ar' ? 'rtl' : 'ltr'},
      ]}>
      <View style={{paddingTop: SIZES.large, padding: SIZES.medium, flex: 1}}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <View>
          <Text
            style={[
              styles.title,
              {
                fontSize: 20,
                fontFamily:
                  i18n.language === 'en'
                    ? 'Product Sans Regular'
                    : 'Noto-Kufi-Arabic',
              },
            ]}>
            {t('languageSrc.select_country')}
          </Text>
          <View style={styles.countryGrid}>
            {countries?.map(country => (
              <Pressable
                key={country.id}
                onPress={() => {
                  setSelectCountry(country?.code || 'SA');
                }}
                style={[
                  styles.button,
                  {
                    paddingVertical: i18n.language === 'ar' ? '1.5%' : '2%',
                  },
                  selectedCountry === country?.code && styles.selectedButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontFamily:
                        i18n.language === 'en'
                          ? 'Product Sans Regular'
                          : 'Noto-Kufi-Arabic',
                      color:
                        selectedCountry === country?.code ? 'black' : 'white',
                    },
                  ]}>
                  {country?.name}
                </Text>

                <Image
                  source={{uri: country?.image}}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={[
              styles.title,
              {
                fontSize: 20,
                fontFamily:
                  i18n.language === 'en'
                    ? 'Product Sans Regular'
                    : 'Noto-Kufi-Arabic',
              },
            ]}>
            {t('languageSrc.select_languages')}
          </Text>
          <View style={styles.countryGrid}>
            {language &&
              languages?.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    setSelectedLanguages(item.code);
                  }}
                  style={[
                    styles.button,
                    {
                      paddingVertical: i18n.language === 'ar' ? '1.5%' : '2%',
                      backgroundColor:
                        selectLanguage !== item?.code ? 'black' : 'white',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        fontFamily:
                          i18n.language === 'en'
                            ? 'Product Sans Regular'
                            : 'Noto-Kufi-Arabic',
                        color:
                          selectLanguage === item?.code ? 'black' : 'white',
                      },
                    ]}>
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>
        <View
          style={[
            styles.bottom,
            {gap: i18n.language === 'en' ? normalize(18) : 15},
          ]}>
          <Animated.View>
            <Btn
              text={t('languageSrc.complete')}
              onPress={() => {
                changeLanguage(selectLanguage || 'SA');
                usePostHandler();
              }}
            />
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LanguageSrc;

const styles = StyleSheet.create({
  appLogo: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '85%',
    height: '25%',
    objectFit: 'contain',
    alignSelf: 'center',
    marginTop: '80%',
  },
  countryGrid: {
    // marginTop: i18n.locale === "ar" ? 0 : 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  selectedButton: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
  },
  title: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginVertical: 25,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  taglineHighlight: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 60,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    display: 'flex',
    bottom: '8%',
    width: '95%',
    margin: 'auto',
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: '#000',
    fontSize: normalize(16),
    textAlign: 'center',
  },
  termsText: {
    color: '#fff',
    fontSize: normalize(14),
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 18,
  },
});
