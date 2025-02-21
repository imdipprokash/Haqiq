import {Pressable, StyleSheet, I18nManager} from 'react-native';

export default function BackButton({onPress}: {onPress: () => void}) {
  let isRTL = true;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.backButton, isRTL && styles.backButtonRTL]}>
      {/* <Ionicons
        name={isRTL ? "arrow-forward" : "arrow-back"} // Adjust icon direction
        size={20}
        color="#fff"
        style={styles.back_icon}
      /> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '4%',
    left: '5%', // Default LTR position
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
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
