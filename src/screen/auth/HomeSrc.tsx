import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NewsItem, AdItem} from '../../types/types';
import useGetData from '../../hooks/useGetData';
import NewsCard from '../../components/NewsCard';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';
import {useAppSelector} from '../../redux/store';

import usePost from '../../hooks/usePost';
import moment from 'moment';
import AdsCard from '../../components/AdsCard';

type Props = {};

const HomeSrc = (props: Props) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [combine, setCombine] = useState<any[]>([]);
  const [pageInfo, serPageInfo] = useState(1);
  const [currentItem, setCurrentItem] = useState<any>();
  const {languageCode, countryCode} = useAppSelector(s => s.auth);
  const {response: NewsList, getData: getNewsList} = useGetData({
    endPoint: `/news/?country_code=${countryCode}&language_code=${languageCode}&page_size=${5}&page_number=${pageInfo}&enabled_status=enabled`,
  });

  const {response: AdsList, getData: getAdsList} = useGetData({
    endPoint: `/ads/?country_code=${countryCode}&language_code=${languageCode}&page_size=${1}&page_number=${pageInfo}&enabled_status=enabled`,
  });
  const {response, usePostHandler} = usePost({
    endPoint: '/impressions',
    data: {
      content_id: currentItem?.content_type,
      content_type: currentItem?.id,
      action: 'swipe',
      timestamp: moment(),
      duration: 0,
    },
  });

  console.log(response);

  useEffect(() => {
    getAdsList();
    getNewsList();
  }, [pageInfo]);

  useEffect(() => {
    if (NewsList?.data && AdsList?.data) {
      setCombine((prev: any) => {
        const existingIds = new Set(prev.map((item: any) => item.id)); // Track existing items
        const newCombinedArray: any[] = [...prev]; // Preserve old data

        const newsData = NewsList.data.filter(
          (item: any) => !existingIds.has(item.id),
        );
        const adsData = AdsList.data.filter(
          (item: any) => !existingIds.has(item.id),
        );

        let newsIndex = 0;
        let adsIndex = 0;

        while (newsIndex < newsData.length || adsIndex < adsData.length) {
          if (newsIndex < newsData.length) {
            newCombinedArray.push(...newsData.slice(newsIndex, newsIndex + 5));
            newsIndex += 5;
          }
          if (adsIndex < adsData.length) {
            newCombinedArray.push(adsData[adsIndex]);
            adsIndex++;
          }
        }

        return newCombinedArray;
      });
    }
  }, [NewsList, AdsList]);

  useEffect(() => {
    console.log(currentItem?.id);
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
          serPageInfo(prev => prev + 1);
        }}
      />
    </View>

    // <DeckSwiper />
  );
};

export default HomeSrc;

const styles = StyleSheet.create({});
