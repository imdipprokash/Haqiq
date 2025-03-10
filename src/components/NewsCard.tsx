import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  Colors,
  layouts,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants/constants';
import i18n from '../../i18n';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from './back-button';
import {timeAgo} from '../constants/timeAgo';
import {onDisplayNotification} from '../helper/Notification';
import {useAppSelector} from '../redux/store';
import {openLink} from '../helper/InAppBrowser';

const NewsCard = ({
  item,
  params,
  title,
}: {
  item: any;
  params: any;
  title: string;
}) => {
  const {languageCode} = useAppSelector(s => s.auth);
  const sleep = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  return (
    <Animated.View style={[styles.card]}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BackButton
        pathName={'CategorySrc'}
        title={
          title
            ? title
            : params
            ? item.category.title
            : i18n.t('homePage.feedType')
        }
      />
      <View style={styles.slideContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View
          style={{
            padding: 20,
          }}>
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              {
                fontFamily:
                  languageCode === 'ar'
                    ? 'Noto-Kufi-Arabic'
                    : 'RobotoFlex-Regular',
              },
            ]}>
            {item.title}
          </Text>
          <Text
            numberOfLines={SCREEN_HEIGHT < 735 ? 8 : 11}
            style={[
              styles.description,
              {
                fontFamily:
                  languageCode === 'ar'
                    ? 'Noto-Kufi-Arabic'
                    : 'RobotoFlex-Regular',
              },
            ]}>
            {item.content}
          </Text>
        </View>

        {/* bottom View */}
        <View style={styles.bottomItem}>
          <View style={[styles.buttonContainer, {flexDirection: 'row'}]}>
            <Text
              style={
                (styles.swipeText,
                {
                  fontFamily:
                    languageCode === 'ar'
                      ? 'Noto-Kufi-Arabic'
                      : 'RobotoFlex-Regular',
                  color: 'white',
                })
              }>
              {i18n.t('homePage.swipe_up')}
            </Text>
            <Pressable
              onPress={() => {
                onDisplayNotification({
                  title: item.title,
                  des: item.content,
                  img: item.image,
                });
              }}>
              <Text
                style={[
                  styles.button,
                  {
                    fontFamily:
                      languageCode === 'ar'
                        ? 'Noto-Kufi-Arabic'
                        : 'RobotoFlex-Regular',
                  },
                ]}>
                {i18n.t('homePage.haqiq')}
              </Text>
            </Pressable>
          </View>
          <View style={{overflow: 'hidden'}}>
            <ImageBackground
              blurRadius={6}
              source={{uri: item.image}}
              style={styles.backgroundImage}>
              <View style={styles.overlay} />

              <Pressable
                onPress={() => {
                  openLink({url: item?.source_url});
                }}>
                <View style={[styles.sourceContainer]}>
                  <Text
                    style={[
                      styles.source,
                      {
                        fontFamily:
                          languageCode === 'ar'
                            ? 'Noto-Kufi-Arabic'
                            : 'RobotoFlex-Regular',
                      },
                    ]}>
                    {i18n.t('homePage.swipe_right')}({item.source.name})
                  </Text>
                  <Text
                    style={[
                      styles.timeAgo,
                      {
                        fontFamily:
                          languageCode === 'ar'
                            ? 'Noto-Kufi-Arabic'
                            : 'RobotoFlex-Regular',
                      },
                    ]}>
                    {i18n.t('homePage.createdBy')}
                    {item.author.first_name} {item.author.last_name}
                    {' ,'}
                    {timeAgo(item.published_at)}
                  </Text>
                </View>
              </Pressable>
            </ImageBackground>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  card: {
    borderRadius: layouts.borderRadius,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.light.text,
  },
  slideContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: wp(100),
    objectFit: 'cover',
    height: hp(40),
  },
  title: {
    fontSize: wp(4.5),
    color: '#fff',
    marginBottom: hp(1.3),
    lineHeight: hp(3.5),
  },
  description: {
    paddingVertical: 1,
    fontSize: wp(3.8),
    color: '#fff',
    lineHeight: hp(3),
    letterSpacing: 0.8,
  },
  bottomItem: {
    height: hp(20),
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    gap: hp(1),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
    paddingHorizontal: 16,
  },
  swipeText: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: wp(1.4),
    borderRadius: 99999,
    color: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: 75, //hp(8)
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  sourceContainer: {
    padding: SCREEN_WIDTH < 380 ? 10 : 20,
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH < 380 ? 0 : 2,
  },
  source: {
    color: '#fff',
  },
  timeAgo: {
    color: '#fff',
    fontSize: 14,
    opacity: 1,
  },
});
