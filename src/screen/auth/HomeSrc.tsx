import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useGetData from '../../hooks/useGetData';
import NewsCard from '../../components/NewsCard';
import {SCREEN_HEIGHT} from '../../constants/constants';
import {useAppSelector} from '../../redux/store';
import usePost from '../../hooks/usePost';
import moment from 'moment';
import AdsCard from '../../components/AdsCard';
import {useFocusEffect} from '@react-navigation/native';
import notifee from '@notifee/react-native';

type Props = {};

const HomeSrc = ({route}: any) => {
  const item = route.params;

  const [combine, setCombine] = useState<any[]>(
    item?.SearchNews ? item?.SearchNews : [],
  );
  const [pageInfo, serPageInfo] = useState(1);
  const [currentItem, setCurrentItem] = useState<any>();
  const {languageCode, countryCode} = useAppSelector(s => s.auth);
  const {response: NewsList, getData: getNewsList} = useGetData({
    endPoint: item?.SearchNews
      ? ''
      : item?.item
      ? `/categories/${
          item?.item
        }/news?country_code=${countryCode}&language_code=${languageCode}&page_size=${5}&page_number=${pageInfo}&enabled_status=enabled`
      : `/news/?country_code=${countryCode}&language_code=${languageCode}&page_size=${5}&page_number=${pageInfo}&enabled_status=enabled`,
  });

  const {response: AdsList, getData: getAdsList} = useGetData({
    endPoint: `/ads/?country_code=${countryCode}&language_code=${languageCode}&page_size=${1}&page_number=${pageInfo}&enabled_status=enabled`,
  });
  const {response, usePostHandler} = usePost({
    endPoint: '/impressions',
    data: {
      content_id: currentItem?.id,
      content_type: currentItem?.content_type,
      action: 'swipe',
      timestamp: moment(),
      duration: 1,
    },
  });

  const HandlePermission = async () => {
    const res = await notifee.requestPermission();
    // console.log(res);
  };

  useFocusEffect(
    React.useCallback(() => {
      HandlePermission();
      getNewsList();
      return () => {};
    }, [pageInfo]),
  );

  useEffect(() => {
    if (NewsList?.data) {
      setCombine((prev: any) => {
        const existingIds = new Set(prev.map((item: any) => item.id)); // Track existing items
        const newCombinedArray: any[] = [...prev]; // Preserve old data
        const newsData = NewsList.data.filter(
          (item: any) => !existingIds.has(item.id),
        );
        newCombinedArray.push(...newsData);
        return newCombinedArray;
      });
    }
  }, [NewsList, AdsList]);

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentItem(viewableItems[0].item);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 10});
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {combine?.length > 0 ? (
        <FlatList
          style={{direction: languageCode === 'ar' ? 'rtl' : 'ltr'}}
          keyExtractor={item => item?.id?.toString()}
          data={combine}
          renderItem={item =>
            item?.item?.content_type === 'news_articles' ? (
              <NewsCard item={item?.item} />
            ) : (
              <AdsCard item={item.item} />
            )
          }
          snapToAlignment="start" // Aligns items to the top when scrolling
          snapToInterval={SCREEN_HEIGHT} // Snaps to full-screen height
          decelerationRate="fast" // Makes scrolling snappier
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewRef?.current}
          viewabilityConfig={viewConfigRef.current}
          onEndReachedThreshold={2}
          onScrollEndDrag={() => {
            if (!item) usePostHandler();
          }}
          onEndReached={() => {
            serPageInfo(prev => prev + 1);
          }}
        />
      ) : (
        <ActivityIndicator size={30} color={'#47183A'} />
      )}
    </View>
  );
};

export default HomeSrc;

const styles = StyleSheet.create({});
