import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useGetData from '../../hooks/useGetData';
import NewsCard from '../../components/NewsCard';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import usePost from '../../hooks/usePost';
import moment from 'moment';
import AdsCard from '../../components/AdsCard';
import {useFocusEffect} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import NoFeed from '../../components/NoFeed';
import LoadingScr from '../../components/LoadingScr';
import DeckSwiper from '../../TryNew/DeckSwiper';

type Props = {};

const HomeSrc = ({route}: any) => {
  const params = route.params;

  const [pageInfo, serPageInfo] = useState(1);
  const [currentItem, setCurrentItem] = useState<any>();
  const {languageCode, countryCode} = useAppSelector(s => s.auth);
  const [dataLoading, setDataLoading] = useState(false);

  console.log(languageCode);

  const [combine, setCombine] = useState<any[]>(
    params?.SearchNews ? params?.SearchNews : [],
  );
  const {
    response: NewsList,
    getData: getNewsList,   
    loading,
  } = useGetData({
    endPoint: params?.SearchNews
      ? ''
      : params?.item
      ? `/categories/${
          params?.item
        }/news?country_code=${countryCode}&language_code=${languageCode}&page_size=${10}&page_number=${pageInfo}&enabled_status=enabled`
      : `/news/?country_code=${countryCode}&language_code=${languageCode}&page_size=${10}&page_number=${pageInfo}&enabled_status=enabled`,
  });

  const {usePostHandler} = usePost({
    endPoint: '/impressions',
    data: {
      content_id: currentItem?.id,
      content_type: currentItem?.content_type,
      action: 'swipe',
      timestamp: moment(),
      duration: 1,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      getNewsList();
      return () => {};
    }, [pageInfo]),
  );

  useEffect(() => {
    if (NewsList?.data && !loading) {
      setCombine((prev: any) => [...prev, ...NewsList?.data]);
      setDataLoading(false);
    }
    if (loading) {
      setDataLoading(loading);
    }
  }, [NewsList, loading]);

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentItem(viewableItems[0].item);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 10});

  // return <DeckSwiper />;
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        style={{
          direction: languageCode === 'ar' ? 'rtl' : 'ltr',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        }}
        keyExtractor={item => {
          const id = uuid();
          return id;
        }}
        data={combine} //combine
        renderItem={item =>
          item?.item?.content_type === 'news_articles' ? (
            <NewsCard
              title={params?.SearchNews && 'Search'}
              item={item?.item}
              params={params}
            />
          ) : (
            <AdsCard item={item.item} />
          )
        }
        horizontal={false}
        snapToAlignment="start"
        snapToInterval={SCREEN_HEIGHT}
        pagingEnabled
        decelerationRate="fast" // Makes scrolling snappier
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef?.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReachedThreshold={0.2}
        onScrollEndDrag={() => {
          if (!params) usePostHandler();
        }}
        onEndReached={() => {
          serPageInfo(prev => prev + 1);
        }}
        refreshing={loading}
        scrollEventThrottle={16} // Improves scroll event handling
        disableIntervalMomentum={true} // Prevents multiple scrolls per swipe
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT, // Each item is exactly one full screen
          offset: SCREEN_HEIGHT * index, // Calculates the offset for snapping
          index,
        })}
        disableVirtualization={false}
        ListEmptyComponent={() =>
          dataLoading ? (
            <LoadingScr />
          ) : (
            <NoFeed
              onPress={() => {
                getNewsList();
              }}
            />
          )
        }
      />
    </View>
  );
};

export default HomeSrc;

const styles = StyleSheet.create({});
