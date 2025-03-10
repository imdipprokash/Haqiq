import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {NewsData} from './Data';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import NewsCard from '../components/NewsCard';
import AdsCard from '../components/AdsCard';
import {v4} from 'uuid';

const {height} = Dimensions.get('window');

const DeckSwiper: React.FC = () => {
  const [news, setNews] = useState(NewsData);
  const translateY = useSharedValue<number>(0);
  const opacity = useSharedValue(1);

  const removeCurrentImage = () => {
    // Small delay ensures smooth transition before removing
    setTimeout(() => {
      setNews(prevNews => {
        const updatedNews = prevNews.slice(1);

        // Check if only 2 items are left, then call the function
        if (updatedNews.length === 2) {
          runOnJS(() => {})();
        }

        return updatedNews;
      });
      translateY.value = 0;
      opacity.value = 1;
    }, 100); // Delay allows the animation to settle
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (-event.translationY > height * 0.3) {
        // Fade out first before removing
        opacity.value = withTiming(0, {duration: 300});
        translateY.value = withTiming(-height, {duration: 500}, () => {
          runOnJS(removeCurrentImage)();
        });
      } else {
        // Reset if swipe isn't strong enough
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  return (
    <>
      {news?.map((item, index) => {
        const isCurrent = index === 0;
        return (
          <Animated.View
            key={v4()} // Ensure stable key to avoid re-renders
            style={[
              styles.card,
              isCurrent && animatedStyle,
              {zIndex: -index}, // Ensures correct stacking order
            ]}>
            {isCurrent ? (
              <GestureDetector gesture={panGesture}>
                {item?.content_type === 'news_articles' ? (
                  <NewsCard title={'Search'} item={item} params={''} />
                ) : (
                  <AdsCard item={item} />
                )}
              </GestureDetector>
            ) : item?.content_type === 'news_articles' ? (
              <NewsCard title={'Search'} item={item} params={''} />
            ) : (
              <AdsCard item={item} />
            )}
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default DeckSwiper;
