import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {BlurView} from '@react-native-community/blur';

type Props = {};

const BlurViewWithChildren = (props: {children: ReactNode}) => {
  return (
    <View style={{overflow: 'hidden', width: '100%', height: 600}}>
      <BlurView
        style={[StyleSheet.absoluteFill, {}]}
        overlayColor={'transparent'}
        blurAmount={Platform.OS === 'ios' ? 10 : 18}>
        {props.children}
      </BlurView>
    </View>
  );
};

export default BlurViewWithChildren;

const styles = StyleSheet.create({});
