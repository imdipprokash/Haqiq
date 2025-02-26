import {
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated from 'react-native-reanimated';
import {NewsItem, AdItem} from '../../types/types';
import useGetData from '../../hooks/useGetData';
import NewsCard from '../../components/NewsCard';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';
import {useAppSelector} from '../../redux/store';
import useAxios from '../../hooks/usePost';
import usePost from '../../hooks/usePost';
import moment from 'moment';
import AdsCard from '../../components/AdsCard';

type Props = {};

const HomeSrc = (props: Props) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [combine, setCombine] = useState<any>([]);
  const [currentItem, setCurrentItem] = useState<any>();
  const {languageCode} = useAppSelector(s => s.auth);
  const {response: NewsList, getData: getNewsList} = useGetData({
    endPoint: '/news',
  });

  const {response: AdsList, getData: getAdsList} = useGetData({
    endPoint: '/ads',
  });
  const {response, usePostHandler} = usePost({
    endPoint: '/impressions',
    data: {
      content_id: currentItem?.content_type,
      content_type: currentItem?.id,
      action: 'scroll',
      timestamp: moment(),
      duration: 0,
    },
  });
  useEffect(() => {
    if (NewsList?.data) {
      if (AdsList?.data) {
        setCombine((prev: any) => [
          ...prev,
          ...NewsList?.data,
          AdsList?.data[0],
        ]);
      } else {
        setCombine((prev: any) => [...prev, ...NewsList?.data]);
      }
      // setCombine(AdsList?.data);
      // setNews(NewsList?.data);
    }
  }, [NewsList, AdsList]);

  useEffect(() => {
    getNewsList();
    getAdsList();
  }, []);

  useEffect(() => {
    if (currentItem?.id) {
      usePostHandler();
    }
  }, [currentItem]);

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentItem(viewableItems[0].item);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        style={{direction: languageCode === 'ar' ? 'rtl' : 'ltr'}}
        keyExtractor={item => item?.id?.toString()}
        data={combine}
        renderItem={item =>
          item?.item?.content_type === 'news' ? (
            <NewsCard item={item?.item} />
          ) : (
            <AdsCard item={item.item} />
          )
        }
        snapToAlignment="start" // Aligns items to the top when scrolling
        snapToInterval={SCREEN_HEIGHT} // Snaps to full-screen height
        decelerationRate="fast" // Makes scrolling snappier
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReachedThreshold={2}
        onEndReached={() => {
          console.log('FlatList');
        }}
      />
    </View>

    // <DeckSwiper />
  );
};

export default HomeSrc;

const styles = StyleSheet.create({});
