import {
  Dimensions,
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NewsItem, AdItem} from '../../types/types';
import useGetData from '../../hooks/useGetData';
import NewsCard from '../../components/NewsCard';
import {SCREEN_HEIGHT} from '../../constants/constants';
import i18n from '../../../i18n';
import {useAppSelector} from '../../redux/store';

type Props = {};

const HomeSrc = (props: Props) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const {languageCode} = useAppSelector(s => s.auth);
  const {response: NewsList, getData: getNewsList} = useGetData({
    endPoint: '/news',
  });

  useEffect(() => {
    if (NewsList) {
      setNews(NewsList?.data);
    }
  }, [NewsList]);
  useEffect(() => {
    getNewsList();
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{direction: languageCode === 'ar' ? 'rtl' : 'ltr'}}
        keyExtractor={item => item.id.toString()}
        data={news}
        renderItem={item => <NewsCard item={item?.item} />}
        snapToAlignment="start" // Aligns items to the top when scrolling
        snapToInterval={SCREEN_HEIGHT} // Snaps to full-screen height
        decelerationRate="fast" // Makes scrolling snappier
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeSrc;

const styles = StyleSheet.create({});
