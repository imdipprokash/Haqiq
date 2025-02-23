import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingSrc from './src/screen/no-auth/LandingSrc';
import LanguageSrc from './src/screen/no-auth/LanguageSrc';
import {useAppSelector} from './src/redux/store';
import HomeSrc from './src/screen/auth/HomeSrc';
import CategorySrc from './src/screen/auth/CategorySrc';

type Props = {};
const Stack = createNativeStackNavigator();
const Route = (props: Props) => {
  const {accessToken} = useAppSelector(s => s.auth);

  return accessToken ? (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeSrc"
        component={HomeSrc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategorySrc"
        component={CategorySrc}
        options={{headerShown: false}}
      />
      {/*  */}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingSrc"
        component={LandingSrc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LanguageSrc"
        component={LanguageSrc}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Route;

const styles = StyleSheet.create({});
