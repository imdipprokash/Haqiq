import {Pressable, StyleSheet, I18nManager, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../redux/store';
import {View} from 'react-native-reanimated/lib/typescript/Animated';

export default function BackButton({onPress}: {onPress: () => void}) {
  const {languageCode} = useAppSelector(s => s.auth);
  return (
    <Pressable onPress={onPress} style={[styles.backButton]}>
      <Image
        source={require('../../assets/images/BackIcon.png')}
        style={{
          width: wp(5),
          height: hp(2),
          transform: [{rotate: languageCode === 'ar' ? '180deg' : '0deg'}],
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '5.5%',
    marginHorizontal: '5%', // Default LTR position
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 99999,
    width: 40,
    height: 40,
  },
  backButtonRTL: {
    left: 'auto',
    right: '5%', // Move to right for RTL
  },
  back_icon: {
    backgroundColor: 'black',
    borderRadius: 19,
    padding: 8,
  },
});
