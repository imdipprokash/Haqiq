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
import {BlurView} from '@react-native-community/blur';
import {Category, NewsItem} from '../../types/types';
import useGetData from '../../hooks/useGetData';

type Props = {};

const CategorySrc = (props: Props) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useAppDispatch();
  const {languageCode} = useAppSelector(s => s.auth);
  const [categories, setCategories] = useState<Category[]>([]);

  const isRTL = languageCode === 'ar';

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState('');

  const [searchResult, setSearchResult] = useState<NewsItem[]>([]);

  const [debouncedInput, setDebouncedInput] = useState('');

  const {response, getData} = useGetData({
    endPoint: '/categories',
  });

  useEffect(() => {
    setCategories(response?.data);
  }, [response]);
  useEffect(() => {
    // dispatch(REMOVE_AUTH()); edges={['top']}
    getData();
    setRefresh(!refresh);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.container}>
          <View
            style={[styles.header, isRTL && {flexDirection: 'row-reverse'}]}>
            <TouchableOpacity
              // onPress={() => router.push("/auth")}
              style={[
                styles.backButton,
                isRTL && {flexDirection: 'row-reverse'},
              ]}>
              {/* <Ionicons
              name={isRTL ? "arrow-forward" : "arrow-back"}
              size={24}
              color="white"
            /> */}
              <Text style={[styles.backText, isRTL && {textAlign: 'right'}]}>
                {isRTL ? 'العودة إلى القائمة' : 'Back to Feed'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              {/* <Ionicons name="settings-sharp" size={26} color="white" /> */}
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.inputContainer,
              isRTL && {flexDirection: 'row-reverse'},
            ]}>
            <TextInput
              style={[styles.searchInput, isRTL && {textAlign: 'right'}]}
              value={input}
              onChangeText={setInput}
              placeholder={isRTL ? 'بحث' : 'Search'}
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchButton}>
              {/* <Ionicons name="search" size={18} color="white" /> */}
            </TouchableOpacity>
          </View>

          {!searchResult.length && (
            <Text style={[styles.title, isRTL && {textAlign: 'right'}]}>
              {isRTL ? 'جميع الفئات' : 'All Categories'}
            </Text>
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          ) : searchResult.length ? (
            <>
              <Text style={[styles.title, isRTL && {textAlign: 'right'}]}>
                {isRTL ? 'نتائج البحث' : 'Search Results'}
              </Text>
              <ScrollView contentContainerStyle={styles.searchContainerDiv}>
                {searchResult.map(result => (
                  <View key={result.id} style={styles.searchContainer}>
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
                          source={{uri: result.image}}
                          style={styles.ResultbackgroundImage}
                          imageStyle={styles.imageRounded}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            {color: 'white', fontSize: 16},
                            isRTL && {textAlign: 'right'},
                          ]}>
                          {result.title}
                        </Text>
                        <Text
                          style={[
                            {color: 'white', fontSize: 16, marginTop: 10},
                            isRTL && {textAlign: 'right'},
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
                    ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
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
    padding: 10,
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
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
  },
  searchButton: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
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
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  ResultbackgroundImage: {
    width: 140,
    flex: 1,
  },
  imageRounded: {
    borderRadius: 12,
    width: '100%',
    height: 150,
  },
});
