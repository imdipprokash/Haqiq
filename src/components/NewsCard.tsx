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
import React from 'react';
import {
  Colors,
  layouts,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants/constants';
import i18n from '../../i18n';
import {NewsItem} from '../types/types';
import {BlurView} from '@react-native-community/blur';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from './back-button';
import {useNavigation} from '@react-navigation/native';

const NewsCard = ({item}: {item: NewsItem}) => {
  const nav = useNavigation<any>();

  return (
    <Animated.View style={[styles.card]}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <BackButton onPress={() => nav.navigate('CategorySrc')} />
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
                fontFamily: I18nManager.isRTL
                  ? 'Noto-Kufi-Arabic'
                  : 'Poppins-Regular',
              },
            ]}>
            {item.title}
          </Text>
          <Text
            numberOfLines={SCREEN_HEIGHT < 735 ? 8 : 11}
            style={[
              styles.description,
              {
                fontFamily: I18nManager.isRTL
                  ? 'Noto-Kufi-Arabic'
                  : 'Poppins-Regular',
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
                  color: 'white',
                })
              }>
              {i18n.t('homePage.swipe_up')}
            </Text>
            <Text style={[styles.button]}>{i18n.t('homePage.haqiq')}</Text>
          </View>
          <View style={{overflow: 'hidden'}}>
            <ImageBackground
              blurRadius={6}
              source={{uri: item.image}}
              style={styles.backgroundImage}>
              <View style={styles.overlay} />
              {/* <BlurView
                blurAmount={10}
                style={styles.blurContainer}
                overlayColor="transparent"
              /> */}

              <Pressable onPress={() => {}}>
                <View style={[styles.sourceContainer]}>
                  <Text style={[styles.source]}>
                    {i18n.t('homePage.swipe_right')}({item.source.name})
                  </Text>
                  <Text style={[styles.timeAgo]}>
                    {/* {timeAgo(item.published_at)} */}
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
    fontSize: wp(5),
    color: '#fff',
    marginBottom: hp(1.3),
  },
  description: {
    paddingVertical: 1,
    fontSize: wp(3.9),
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
    paddingVertical: SCREEN_WIDTH < 380 ? 2 : 10,
    borderRadius: SCREEN_WIDTH < 380 ? 10 : 20,
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
