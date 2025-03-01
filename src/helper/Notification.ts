import notifee from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export async function onDisplayNotification() {
  // Request permissions (required for iOS)
  await notifee.requestPermission();
  const soundsList = await NotificationSounds.getNotifications('notification');

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'sound',
    name: 'Default Channel',
    sound: soundsList[1].url,
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',

    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
