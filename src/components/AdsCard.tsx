import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import {AdItem} from '../types/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {openLink} from '../helper/InAppBrowser';

const AdsCard = ({item}: {item: AdItem}) => {
  return (
    <FastImage
      source={{
        uri: item?.image,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <View style={styles.bottomContent}>
        <TouchableOpacity
          onPress={() => {
            console.log(item.ad_url);
            item.ad_url && openLink({url: item.ad_url});
          }}
          activeOpacity={0.7}
          style={{
            backgroundColor: item?.theme?.background_color || '#fff',
            paddingHorizontal: 70,
            paddingVertical: 20,
            borderRadius: 50,
          }}>
          <Text style={[styles.buttonText]}>Read More</Text>
        </TouchableOpacity>

        <Text style={styles.swipeText}>Swipe up for next</Text>
      </View>
    </FastImage>
  );
};

export default AdsCard;

const styles = StyleSheet.create({
  bottomContent: {
    position: 'absolute',
    bottom: hp(7),
    width: '100%',
    alignItems: 'center',
    gap: hp(2),
  },
  buttonText: {
    fontSize: wp(4.3),
    fontWeight: '600',
    color: '#000',
  },
  swipeText: {
    color: 'black',
    fontSize: wp(4.2),
  },
});
