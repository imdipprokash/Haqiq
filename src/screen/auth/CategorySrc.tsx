import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SCREEN_HEIGHT, SCREEN_WIDTH, SIZES} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {REMOVE_AUTH} from '../../redux/slices/authInfo';
// import {BlurView} from '@react-native-community/blur';
import {Category, NewsItem} from '../../types/types';
import useGetData from '../../hooks/useGetData';
import BackButton from '../../components/back-button';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const CategorySrc = () => {
  const nav = useNavigation<any>();
  const {languageCode} = useAppSelector(s => s.auth);
  const [categories, setCategories] = useState<Category[]>([]);

  const isRTL = languageCode === 'ar';
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState<NewsItem[]>([]);

  const {response, getData} = useGetData({
    endPoint: '/categories',
  });

  const {response: searchResultRes, getData: searchResultHandler} = useGetData({
    endPoint: `/news?search=${input}`,
  });
  useEffect(() => {
    if (searchResultRes?.data) setSearchResult(searchResultRes?.data);
  }, [searchResultRes]);
  useEffect(() => {
    if (input.length > 3) {
      searchResultHandler();
    } else {
      setSearchResult([]);
    }
  }, [input]);

  useEffect(() => {
    response?.data && setCategories(response?.data);
  }, [response]);
  useEffect(() => {
    getData();
    setInput('');
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={[
        {width: SCREEN_WIDTH, height: SCREEN_HEIGHT},
        {direction: languageCode === 'ar' ? 'rtl' : 'ltr'},
      ]}>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_WIDTH,
          marginVertical: SIZES.large,
        }}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.container}>
          <View style={[styles.header]}>
            <TouchableOpacity
              onPress={() => nav.navigate('HomeSrc')}
              style={[styles.backButton]}>
              <Image
                source={require('../../../assets/images/BackIcon.png')}
                style={{
                  width: wp(5),
                  height: hp(2),
                  transform: [
                    {rotate: languageCode === 'ar' ? '180deg' : '0deg'},
                  ],
                }}
              />
              <Text
                style={[
                  styles.backText,
                  isRTL && {textAlign: 'right'},
                  {
                    fontFamily: !isRTL
                      ? 'Product Sans Regular'
                      : 'Noto-Kufi-Arabic',
                  },
                ]}>
                {isRTL ? 'العودة إلى القائمة' : 'Back to Feeds'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate('UpdateLanguageSrc');
              }}>
              <Image
                source={require('../../../assets/images/settings.png')}
                style={{
                  width: wp(5),
                  height: hp(2.4),
                  transform: [
                    {rotate: languageCode === 'ar' ? '180deg' : '0deg'},
                  ],
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.inputContainer,
              // isRTL && {flexDirection: 'row-reverse'},
            ]}>
            <TextInput
              style={[
                styles.searchInput,
                isRTL && {textAlign: 'right'},
                {
                  fontFamily: !isRTL
                    ? 'Product Sans Regular'
                    : 'Noto-Kufi-Arabic',
                },
              ]}
              value={input}
              onChangeText={setInput}
              placeholder={isRTL ? 'بحث' : 'Search'}
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchButton}>
              {/* <Ionicons name="search" size={18} color="white" /> */}
              <Image
                source={require('../../../assets/images/SearchIcon.png')}
                style={{
                  width: 12,
                  height: 12,
                  transform: [
                    {rotate: languageCode === 'ar' ? '90deg' : '0deg'},
                  ],
                }}
              />
            </TouchableOpacity>
          </View>

          {!searchResult.length && (
            <Text
              style={[
                styles.title,
                isRTL && {textAlign: 'right'},
                {
                  fontFamily: !isRTL ? 'Product Sans Bold' : 'Noto-Kufi-Arabic',
                },
              ]}>
              {isRTL ? 'جميع الفئات' : 'All Categories'}
            </Text>
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          ) : searchResult.length ? (
            <>
              <Text
                style={[
                  styles.title,
                  {
                    fontFamily: !isRTL
                      ? 'Product Sans Regular'
                      : 'Noto-Kufi-Arabic',
                  },
                ]}>
                {isRTL ? 'نتائج البحث' : 'Search Results'}
              </Text>
              <ScrollView
                contentContainerStyle={[
                  styles.searchContainerDiv,
                  {direction: isRTL ? 'rtl' : 'ltr'},
                ]}>
                {searchResult.map(result => (
                  <View key={result.id} style={[styles.searchContainer]}>
                    <TouchableOpacity
                      style={styles.searchContainer}
                      // onPress={() => router.push("/auth")}
                    >
                      <View
                        style={{
                          marginBottom: 12,
                          height: 150,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          elevation: 1,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,
                          borderCurve: 'continuous',
                        }}>
                        <ImageBackground
                          source={{uri: result?.image}}
                          style={styles.ResultBackgroundImage}
                          imageStyle={styles.imageRounded}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            {
                              color: 'white',
                              fontSize: 16,
                              fontFamily: !isRTL
                                ? 'Product Sans Regular'
                                : 'Noto-Kufi-Arabic',
                            },
                          ]}>
                          {result.title}
                        </Text>
                        <Text
                          style={[
                            {
                              color: 'white',
                              fontSize: 16,
                              marginTop: 10,
                              fontFamily: !isRTL
                                ? 'Product Sans Regular'
                                : 'Noto-Kufi-Arabic',
                            },
                          ]}>
                          {/* {timeAgo(result.created_at)} */}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <ScrollView
              contentContainerStyle={[
                styles.categoriesContainer,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              {categories?.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, {}]}
                  // onPress={() => router.push("/auth")}
                >
                  <Image
                    source={{uri: category.image}}
                    style={styles.backgroundImage}
                  />
                  <Text
                    style={[
                      styles.categoryTitle,
                      isRTL && {textAlign: 'right'},
                      {
                        fontFamily: !isRTL
                          ? 'Product Sans Regular'
                          : 'Noto-Kufi-Arabic',
                      },
                    ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default CategorySrc;

const styles = StyleSheet.create({
  loadingContainer: {
    fontFamily: 'Roboto',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  inputContainer: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    height: hp(7),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    gap: 4,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: 3,
  },
  backText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 6,
    fontWeight: 400,
  },
  searchButton: {
    width: 35,
    height: 35,
    backgroundColor: '#061D39',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
  },
  list: {
    justifyContent: 'space-between',
  },
  searchContainerDiv: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#aaa',
  },
  categoryCard: {
    width: '33.3%',
    padding: 8,
  },
  categoryImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexWrap: 'wrap',
    padding: 8,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 130,
    borderRadius: 15,
    marginBottom: 5,
  },
  ResultBackgroundImage: {
    width: wp(32),
    flex: 1,
  },
  imageRounded: {
    borderRadius: 12,
    width: '100%',
    height: hp(15),
  },
});
