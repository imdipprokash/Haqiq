import notifee from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';

export async function onDisplayNotification({
  title,
  des,
  img,
}: {
  title: string;
  des: string;
  img: string;
}) {
  const soundsList = await NotificationSounds.getNotifications('notification');

  const channelId = await notifee.createChannel({
    id: 'sound',
    name: 'Default Channel',
    sound: soundsList[1].url,
    badge: false,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: des,

    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: img,
      // pressAction: {
      //   id: 'default',
      // },
    },
  });
}
