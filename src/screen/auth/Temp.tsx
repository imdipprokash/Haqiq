import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

export default function Temp() {
  const nav = useNavigation<any>();
  return (
    <>
      <View style={styles.container}>
        <Image
          key={'blurryImage'}
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.absolute}
        />
        <Text style={styles.absolute}>Hi, I am some blurred text</Text>
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <Text>
          I'm the non blurred text because I got rendered on top of the BlurView
        </Text>
      </View>
      <Pressable onPress={() => nav.navigate('CategorySrc')}>
        <Text>Btn</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 400,
  },
});
