import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize, TEXT_SIZE} from '../constants/constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  text: string;
  onPress: () => void;
};

const Btn = ({text, onPress}: Props) => {
  return (
    <Pressable style={styles.btnStyle} onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 22,
            fontFamily: 'Product Sans Regular',
            paddingVertical:
              Platform.OS === 'ios'
                ? heightPercentageToDP(2.1)
                : heightPercentageToDP(2),
          },
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fff',
    // padding: 20,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderCurve: 'continuous',
  },
  textStyle: {
    color: '#000',
    fontSize: normalize(TEXT_SIZE.medium),
    textAlign: 'center',
  },
});
