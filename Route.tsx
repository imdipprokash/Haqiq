import {I18nManager, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LandingSrc from './src/screen/no-auth/LandingSrc';
import LanguageSrc from './src/screen/no-auth/LanguageSrc';
import {useAppSelector} from './src/redux/store';
import HomeSrc from './src/screen/auth/HomeSrc';
import CategorySrc from './src/screen/auth/CategorySrc';
import UpdateLanguageSrc from './src/screen/auth/UpdateLanguageSrc';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Route = () => {
  const {accessToken, languageCode} = useAppSelector(s => s.auth);

  //Notifee
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    try {
      //@ts-ignore
      notification?.id && (await notifee.cancelNotification(notification?.id));
    } catch (error) {
      console.log(error);
    }
  });

  async function requestNotificationPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log('User denied notifications');
    } else if (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
    ) {
      console.log('User granted notifications');
    }
  }

  const UpdateI18 = async () => {
    try {
      await AsyncStorage.setItem('settings.lang', languageCode || 'en');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    UpdateI18();

    if (languageCode === 'ar') {
      I18nManager.forceRTL(true), I18nManager.allowRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  }, [I18nManager]);

  return accessToken ? (
    <Stack.Navigator
      initialRouteName="HomeSrc"
      screenOptions={
        languageCode !== 'ar'
          ? {
              headerShown: false,
              ...TransitionPresets.SlideFromLeftIOS,
            }
          : {
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }
      }>
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
      <Stack.Screen
        name="UpdateLanguageSrc"
        component={UpdateLanguageSrc}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="LandingSrc">
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
