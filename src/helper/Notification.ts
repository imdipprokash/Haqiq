import notifee from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';

export async function onDisplayNotification() {
  const soundsList = await NotificationSounds.getNotifications('notification');

  const channelId = await notifee.createChannel({
    id: 'sound',
    name: 'Default Channel',
    // sound: soundsList[1].url,
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
