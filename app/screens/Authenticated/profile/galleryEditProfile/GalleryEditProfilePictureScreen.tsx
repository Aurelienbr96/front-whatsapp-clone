import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../../common/colors';
import {
  AssetType,
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useGetScreenDimensions} from '../../../../common/hook/useGetScreenDimensions';
import {useNavigation} from '@react-navigation/native';
import {CameraRollImageType} from '../../../../type/camera-roll/react-native-camera-role.type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../../router/AuthRouter';

const FETCH_PHOTOS_PARAMS = {
  first: 100,
  assetType: 'Photos' as AssetType,
};

type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authenticated'
>;

export const GalleryEditProfilePictureScreen = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const navigation = useNavigation<RootNavigationProp>();
  const [isFetchingPhotos, setIsFetchingPhotos] = useState(false);
  const [cursor, setCursor] = useState<string>();
  const [hasNextCursor, setHasNextCursor] = useState<boolean>(false);
  const [hLayout, setHLayout] = useState(0);

  const [dimensions] = useGetScreenDimensions();

  const fetchPhotos = () => {
    const params = cursor
      ? {after: cursor, ...FETCH_PHOTOS_PARAMS}
      : FETCH_PHOTOS_PARAMS;
    if (isFetchingPhotos) {
      return;
    }
    setIsFetchingPhotos(true);
    CameraRoll.getPhotos({...params}).then(r => {
      setIsFetchingPhotos(false);
      setPhotos([...photos, ...r.edges]);
      setHasNextCursor(r.page_info.has_next_page);
      setCursor(r.page_info.end_cursor);
    });
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectImage = (image: CameraRollImageType) => () => {
    navigation.navigate('Authenticated', {
      screen: 'SelectedImageScreen',
      params: {image: image.uri},
    });
  };

  const renderItem = ({item}: {item: PhotoIdentifier}) => {
    return (
      <TouchableOpacity
        onPress={handleSelectImage(item.node.image)}
        style={styles.imageContainer}>
        <Image
          style={{
            width: dimensions.screen.width / 3,
            height: dimensions.screen.width / 3,
          }}
          source={{uri: item.node.image.uri}}
        />
      </TouchableOpacity>
    );
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    /* if (scrollOffsetY) {
      console.log('scroll offset :', scrollOffsetY, hLayout, hLayout / 2);
    } */
    if (scrollOffsetY >= hLayout / 2) {
      if (hasNextCursor) {
        fetchPhotos();
      }
    }
  };

  const handleOnLayoutChange = (_: number, h: number) => {
    setHLayout(h);
  };

  return (
    <View style={styles.container}>
      {photos.length > 0 && (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.flatListStyle}
          onContentSizeChange={handleOnLayoutChange}
          onScroll={handleOnScroll}
          data={photos}
          renderItem={renderItem}
          keyExtractor={item => item.node.id}
          numColumns={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    marginTop: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
  pictureContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    padding: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
  },
});
