import React, {useEffect, useMemo} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {colors} from '../../../../common/colors';
import {Camera, Trash2, Image} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useDeleteProfilePictureMutation} from '../../../../api/user/userApi';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../../router/AuthRouter';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  handleSheetChanges?: (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE,
  ) => void;
};

type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authenticated'
>;

const MediaChoiceBottomSheet = ({bottomSheetModalRef}: Props) => {
  const renderBackdrop = (
    props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
  ) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  const navigation = useNavigation<RootNavigationProp>();
  const [deleteProfilePicture, meta] = useDeleteProfilePictureMutation();
  const handleNavigateToCameraScreen = () => {
    bottomSheetModalRef.current?.dismiss();
    navigation.navigate('Authenticated', {
      screen: 'CameraEditProfilePicture',
    });
  };
  const handleNavigateToGalleryScreen = async () => {
    bottomSheetModalRef.current?.dismiss();
    const selectedImage = await launchImageLibrary({
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
    });
    const uri = selectedImage.assets?.[0].uri;
    if (uri) {
      setTimeout(async () => {
        const result = await ImagePicker.openCropper({
          cropperCircleOverlay: true,
          forceJpg: true,
          cropping: true,
          path: uri,
          mediaType: 'photo',
        });
        console.log(result);
      }, 200);

      console.log('uri', uri);
    }

    /* await ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }); */
  };
  const snapPoints = useMemo(() => ['30%'], []);

  const handleDeleteUserProfilePicture = () => {
    deleteProfilePicture();
  };

  useEffect(() => {
    if (meta.isSuccess) {
      bottomSheetModalRef.current?.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.isSuccess]);

  return (
    <View style={styles.bottomSheetStyle}>
      <BottomSheetModal
        name="MediaChoice"
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{
          backgroundColor: colors.lightGray,
        }}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNavigateToCameraScreen}>
              <>
                <Text style={{fontSize: 18}}>Take photo</Text>
                <Camera color={colors.black} />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.borderTop]}
              onPress={handleNavigateToGalleryScreen}>
              <>
                <Text style={{fontSize: 18}}>Choose photo</Text>
                <Image color={colors.black} />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.borderTop]}
              onPress={handleDeleteUserProfilePicture}>
              <>
                <Text style={{fontSize: 18, color: colors.red}}>
                  Delete photo
                </Text>
                {meta.isLoading ? (
                  <ActivityIndicator color={colors.red} />
                ) : (
                  <Trash2 color={colors.red} />
                )}
              </>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderTopColor: colors.gray30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,
  },
  bottomSheetStyle: {
    backgroundColor: colors.lightGray,
  },
});

export default MediaChoiceBottomSheet;
