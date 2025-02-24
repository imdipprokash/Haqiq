import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize, TEXT_SIZE} from '../constants/constants';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../redux/store';

type Props = {
  text: string;
  onPress: () => void;
};

const Btn = ({text, onPress}: Props) => {
  const {i18n} = useTranslation();
  const {languageCode} = useAppSelector(s => s.auth);
  return (
    <Pressable style={styles.btnStyle} onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: languageCode === 'en' ? 22 : 20,
            fontWeight: languageCode === 'en' ? 400 : 600,
            fontFamily:
              languageCode === 'en'
                ? 'Product Sans Regular'
                : 'Noto-Kufi-Arabic',
            paddingVertical: languageCode === 'en' ? 20 : 10,
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
