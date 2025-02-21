import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from '../constants/constants';

type Props = {
  text: string;
};

const Btn = ({text}: Props) => {
  return (
    <Pressable style={styles.btnStyle}>
      <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 13,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderCurve: 'continuous',
  },
  textStyle: {
    color: '#000',
    fontSize: normalize(16),
    textAlign: 'center',
    fontWeight: 300,
    fontFamily: 'Product Sans Bold',
    // lineHeight: deviceLanguage === 'en' ? 20 : 25,
  },
});
