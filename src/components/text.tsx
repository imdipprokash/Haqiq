import React, {useEffect, useState} from 'react';
import {Text as RNText, TextProps, TextStyle, StyleSheet} from 'react-native';
import {I18nManager} from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  language: string; // Accept language as a prop
}

const Text: React.FC<CustomTextProps> = ({
  style,
  children,
  language,
  ...props
}) => {
  return (
    <RNText {...props} style={[style]}>
      {children}
    </RNText>
  );
};

export default Text;
