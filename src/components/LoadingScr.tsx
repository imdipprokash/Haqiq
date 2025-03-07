import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../redux/store';
type Props = {};

const LoadingScr = (props: Props) => {
  const {languageCode} = useAppSelector(s => s.auth);

  return (
    <View style={{gap: hp(2)}}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={wp(100)} height={hp(40)} />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          right={languageCode === 'ar' ? wp(0) : wp(1)}
          left={languageCode !== 'ar' ? wp(0) : wp(1)}
          gap={hp(1.5)}
          height={hp(10)}>
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(4)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(4)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          right={languageCode === 'ar' ? wp(0) : wp(1)}
          left={languageCode !== 'ar' ? wp(0) : wp(1)}
          gap={hp(1)}
          height={hp(40)}>
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(3)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item right={wp(1.5)} gap={hp(1.5)} height={hp(20)}>
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(8)}
          />
          <SkeletonPlaceholder.Item
            alignSelf="center"
            width={wp(95)}
            height={hp(8)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default LoadingScr;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    objectFit: 'cover',
    height: hp(40),
  },
});
