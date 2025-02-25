import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    text: 'Card 1',
    url: 'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg',
  },
  {
    id: '2',
    text: 'Card 2',
    url: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg',
  },
  {
    id: '3',
    text: 'Card 3',
    url: 'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg',
  },
  {
    id: '4',
    text: 'Card 4',
    url: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg',
  },
];

const DeckSwiper = () => {
  const [cards, setCards] = useState(DATA);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const nextCardOpacity = useSharedValue(0); // Start fully hidden
  const nextCardScale = useSharedValue(0.95); // Slightly smaller
  const nextCardTranslateY = useSharedValue(20); // Slightly below

  const swipeCardUp = () => {
    setCards(prev => prev.slice(1)); // Remove the first card
    translateY.value = 0;
    opacity.value = 1;
    scale.value = 1;
    nextCardOpacity.value = 0;
    nextCardScale.value = 0.95;
    nextCardTranslateY.value = 20;
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
        opacity.value = 1 + event.translationY / height;
        scale.value = 1 + (event.translationY / height) * 0.2;

        // Reveal next card smoothly behind the current card
        nextCardOpacity.value = (-event.translationY / height) * 1.5;
        nextCardScale.value = 0.95 + (-event.translationY / height) * 0.05;
        nextCardTranslateY.value = 20 + (-event.translationY / height) * 10;
      }
    })
    .onEnd(event => {
      if (Math.abs(event.translationY) > height * 0.25) {
        translateY.value = withTiming(-height, {}, () => {
          runOnJS(swipeCardUp)();
        });
      } else {
        translateY.value = withSpring(0);
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
        nextCardOpacity.value = withTiming(0); // Hide again if not fully swiped
        nextCardScale.value = withSpring(0.95);
        nextCardTranslateY.value = withSpring(20);
      }
    });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {cards?.map((item, index) => {
        if (index > 1) return null; // Only render top two cards

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            {
              translateY:
                index === 0 ? translateY.value : nextCardTranslateY.value,
            },
            {scale: index === 0 ? scale.value : nextCardScale.value},
          ],
          opacity: index === 0 ? opacity.value : nextCardOpacity.value, // Next card is hidden initially
        }));

        return index === 0 ? (
          <GestureDetector key={item.id} gesture={panGesture}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <ImageBackground source={{uri: item.url}} style={styles.image}>
                <Text style={styles.text}>{item.text}</Text>
              </ImageBackground>
            </Animated.View>
          </GestureDetector>
        ) : (
          <Animated.View key={item.id} style={[styles.card, animatedStyle]}>
            <ImageBackground
              source={{uri: item.url}}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>{item.text}</Text>
            </ImageBackground>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: width,
    height: height,
    borderRightColor: 'red',
  },
  image: {
    width: width,
    height: height,
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default DeckSwiper;
