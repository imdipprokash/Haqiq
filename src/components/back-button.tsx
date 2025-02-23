import {Pressable, StyleSheet, I18nManager, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function BackButton({onPress}: {onPress: () => void}) {
  let isRTL = I18nManager.isRTL;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.backButton, isRTL && styles.backButtonRTL]}>
      <Image
        source={require('../../assets/images/BackIcon.png')}
        style={{width: wp(5), height: hp(2)}}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '5.5%',
    left: '5%', // Default LTR position
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
