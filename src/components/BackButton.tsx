import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type Props = {};

const BackButton = (props: Props) => {
  return (
    <View>
      <Image
        source={require('../../assets/images/BackIcon.png')}
        style={{width: wp(10), height: hp(10)}}
      />
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
