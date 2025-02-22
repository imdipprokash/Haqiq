import {
  Animated,
  I18nManager,
  Image,
  ImageBackground,
  Pressable,
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

type Props = {};

const NewsCard = ({item}: {item: NewsItem}) => {
  console.log(item);
  return (
    <Animated.View style={[styles.card]}>
      {/* {!showBackButton && (
      <BackButton onPress={() => router.push("/auth/categories")} />
    )} */}
      <View style={styles.slideContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View
          style={{
            height: '40%',
            overflow: 'hidden',
          }}>
          <View
            style={{
              padding: 20,
            }}>
            <Text
              numberOfLines={2}
              style={[
                styles.title,
                {
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  fontFamily: I18nManager.isRTL
                    ? 'Noto-Kufi-Arabic'
                    : 'Poppins-Regular',
                },
              ]}>
              {item.title}
            </Text>
            <Text
              //   language={i18n.locale}
              style={[
                styles.description,
                {
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  fontFamily: I18nManager.isRTL
                    ? 'Noto-Kufi-Arabic'
                    : 'Poppins-Regular',
                },
              ]}
              numberOfLines={9}>
              {item.content}
            </Text>
          </View>
        </View>
        <View style={styles.bottomItem}>
          <View
            style={[
              styles.buttonContainer,
              {flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'},
            ]}>
            <Text
              style={
                (styles.swipeText,
                {
                  color: 'white',
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                })
              }>
              {i18n.t('homePage.swipe_up')}
            </Text>
            <Text
              style={[
                styles.button,
                {fontWeight: I18nManager.isRTL ? '600' : 'bold'},
              ]}>
              {i18n.t('homePage.haqiq')}
            </Text>
          </View>
          <View>
            <BlurView style={styles.absolute} blurType="light" blurAmount={10}>
              <Text>Hlw</Text>
            </BlurView>
          </View>

          {/* onPress={openBrowser} */}
          <Pressable style={{height: 200, backgroundColor: 'red'}}>
            <ImageBackground
              source={{uri: item.image}}
              style={styles.backgroundImage}>
              <BlurView blurAmount={10} style={styles.blurContainer} />
              <View style={styles.overlay} />
              <View
                style={[
                  styles.sourceContainer,
                  {alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start'},
                ]}>
                <Text
                  //   language={i18n.locale}
                  style={[
                    styles.source,
                    {textAlign: I18nManager.isRTL ? 'right' : 'left'},
                  ]}>
                  {i18n.t('homePage.swipe_right')}({item.source.name})
                </Text>
                <Text
                  style={[
                    styles.timeAgo,
                    {textAlign: I18nManager.isRTL ? 'right' : 'left'},
                  ]}>
                  {/* {timeAgo(item.published_at)} */}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
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
    width: '100%',
    objectFit: 'cover',
    height: '40%',
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.043,
    color: '#fff',
    marginBottom: SCREEN_WIDTH < 380 ? 8 : 16,
  },
  description: {
    paddingVertical: 2,
    // fontSize: wp('4%'),
    color: '#fff',
    // lineHeight: hp('3%'),
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    fontSize: SCREEN_WIDTH * 0.036,
    letterSpacing: 0.9,
  },
  bottomItem: {
    height: '20%',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    // Flip button direction

    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SCREEN_WIDTH < 380 ? 10 : 16,
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
    height: 75,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sourceContainer: {
    padding: SCREEN_WIDTH < 380 ? 10 : 20,
    justifyContent: 'space-between',
    // Align text correctly
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
