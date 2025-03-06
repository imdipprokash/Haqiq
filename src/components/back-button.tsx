import {Pressable, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, ArrowRightIcon} from 'react-native-heroicons/mini';

export default function BackButton({
  pathName,
  title,
  color,
  bgColor,
}: {
  bgColor?: string;
  color?: string;
  pathName: string;
  title: string;
}) {
  const {languageCode} = useAppSelector(s => s.auth);
  const nav = useNavigation<any>();
  return (
    <Pressable
      onPress={() => nav.navigate(pathName)}
      style={[
        styles.backButton,
        {backgroundColor: bgColor ? bgColor : '#000'},
      ]}>
      {languageCode === 'ar' ? (
        <ArrowRightIcon
          size={25}
          style={styles.backIconStyle}
          color={color ? color : '#fff'}
        />
      ) : (
        <ArrowLeftIcon
          size={18}
          style={styles.backIconStyle}
          color={color ? color : '#fff'}
        />
      )}
      <Text
        style={{
          color: color ? color : '#fff',
          fontFamily:
            languageCode === 'ar' ? 'Noto-Kufi-Arabic' : 'Product Sans Regular',
        }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '5.5%',
    marginHorizontal: '4%', // Default LTR position
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: wp(20),
    minWidth: wp(8),
    minHeight: hp(4.5),
    paddingHorizontal: wp(2.7),
    paddingRight: wp(4),
    gap: wp(1.3),
  },

  backIconStyle: {},
});
