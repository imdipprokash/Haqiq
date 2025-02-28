import {
  Animated,
  I18nManager,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import useAxios from '../../hooks/usePost';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ADD_AUTH} from '../../redux/slices/authInfo';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {};

const UpdateLanguageSrc = (props: Props) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<any>();
  const {countryCode, languageCode, deviceId} = useAppSelector(s => s.auth);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectCountry] = useState<string>(
    countryCode || '',
  );
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectLanguage, setSelectedLanguages] = useState<string>(
    languageCode || '',
  );

  const changeLanguage = async (lng: string) => {
    setLanguage(lng);
    setSelectedLanguages(lng);
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
  useEffect(() => {
    if (!countryListLoading) {
      setCountries(countryList?.data);
    }
    if (languageList) {
      setLanguages(languageList);
      languageList[0]?.code && setSelectedLanguages(languageList[0]?.code);
    }
  }, [countryList, languageList]);

  useEffect(() => {
    if (authRes?.access_token) {
      dispatch(
        ADD_AUTH({
          accessToken: authRes?.access_token,
          refreshToken: authRes?.refresh_token,
          countryCode: selectedCountry || 'SA',
          languageCode: selectLanguage || 'ar',
          deviceId: deviceId,
        }),
      );

      nav.navigate('HomeSrc');
    }
  }, [authRes]);

  useEffect(() => {
    if (selectedCountry) getLanguage();
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
  const isRTL = selectLanguage === 'ar';
  return (
    <View //ImageBackground
      // source={require('../../../assets/images/background.png')}
      // resizeMode="cover"
      // imageStyle={{opacity: 1}}
      style={[
        styles.image,
        {direction: isRTL ? 'rtl' : 'ltr', backgroundColor: '#000'},
      ]}>
      <View style={{paddingTop: SIZES.large, padding: SIZES.medium, flex: 1}}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <View style={[styles.header]}>
          <TouchableOpacity
            style={[styles.backButton]}
            onPress={() => nav.navigate('HomeSrc')}>
            <Image
              source={require('../../../assets/images/BackIcon.png')}
              style={{
                width: wp(5),
                height: hp(2),
                transform: [{rotate: isRTL ? '180deg' : '0deg'}],
              }}
            />
            <Text
              style={[
                styles.backText,
                isRTL && {textAlign: 'right'},
                {
                  fontFamily:
                    selectLanguage === 'en'
                      ? 'Product Sans Regular'
                      : 'Noto-Kufi-Arabic',
                },
              ]}>
              {isRTL ? 'الإعدادات' : 'Settings'}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={[
              styles.title,
              {
                fontSize: 20,
                fontFamily:
                  selectLanguage === 'en'
                    ? 'Product Sans Regular'
                    : 'Noto-Kufi-Arabic',
              },
            ]}>
            {isRTL ? 'اختيار البلد' : 'Select Country'}
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
                  selectLanguage === 'en'
                    ? 'Product Sans Regular'
                    : 'Noto-Kufi-Arabic',
              },
            ]}>
            {isRTL ? 'اختر اللغة' : 'Select Language'}
          </Text>
          <View style={styles.countryGrid}>
            {language &&
              languages?.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    changeLanguage(item.code);
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
              text={isRTL ? 'تحديث' : 'Update'}
              onPress={() => {
                usePostHandler();
              }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default UpdateLanguageSrc;

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(0.1),
    paddingBottom: hp(0.3),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    gap: 4,
  },
  backText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});
