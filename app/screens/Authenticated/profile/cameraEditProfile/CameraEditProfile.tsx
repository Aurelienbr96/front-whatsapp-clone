/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  Point,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {colors} from '../../../../common/colors';

import {useNavigation} from '@react-navigation/native';
import {SwitchCamera} from 'lucide-react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useUpdateProfilePictureMutation} from '../../../../api/user/userApi';

export const CameraEditProfile: React.FC = () => {
  /* Animation style */
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  /* Local state */
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [flash] = useState<'on' | 'off'>('off');
  const [currentPhoto, setCurrentPhoto] = useState<PhotoFile>();
  const [positionFocus, setPositionFocus] = useState<
    {x: number; y: number} | undefined
  >(undefined);
  const renderMarker = positionFocus !== undefined;

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'front',
  );
  const appState = useRef(AppState.currentState);

  const [, setAppStateVisible] = useState<AppStateStatus>(appState.current);

  /* React native vision camera setup */
  const device = useCameraDevice(cameraPosition);
  const format = useCameraFormat(device, [
    {photoResolution: {width: 1280, height: 720}},
  ]);
  const camera = useRef<Camera>(null);
  const {hasPermission} = useCameraPermission();
  /* Navigation */
  const {goBack} = useNavigation();

  /* Rtk query */
  const [updatePhoto, meta] = useUpdateProfilePictureMutation();

  useEffect(() => {
    if (meta.isSuccess) {
      goBack();
    }
  }, [meta.isSuccess]);

  const handleTakePhoto = async () => {
    const photo = await camera.current?.takePhoto({
      flash,
    });
    setIsCameraActive(false);
    setCurrentPhoto(photo);
  };

  const focus = useCallback((point: Point) => {
    const c = camera.current;
    if (c == null) {
      return;
    }
    c.focus(point);
  }, []);

  const handleResetAnimation = () => {
    setTimeout(() => {
      setPositionFocus(undefined);
    }, 800);
  };

  useEffect(() => {
    if (positionFocus === undefined) {
      scale.value = 1;
    }
  }, [positionFocus]);

  const gesture = Gesture.Tap()
    .onEnd(({x, y}) => {
      runOnJS(focus)({x, y});
      runOnJS(handleResetAnimation)();
    })
    .onBegin(({x, y}) => {
      scale.value = withSpring(0.8);

      runOnJS(setPositionFocus)({x, y});
    });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsCameraActive(true);
      } else {
        setIsCameraActive(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleRemoveCurrentPhoto = () => {
    setIsCameraActive(true);
    setCurrentPhoto(undefined);
  };

  const handleOnCancelPress = () => {
    currentPhoto ? handleRemoveCurrentPhoto() : goBack();
  };
  const handleUploadProfilePicture = () => {
    const formData = new FormData();

    const filename = currentPhoto?.path.split('/');
    if (!filename) {
      return;
    }
    const uri =
      Platform.OS === 'android'
        ? currentPhoto?.path
        : currentPhoto?.path.replace('file://', '');

    formData.append('profilePicture', {
      uri,
      type: 'image/jpeg',
      name: filename[filename?.length - 1],
    });
    updatePhoto({
      formData,
    });
  };

  const handleOnSwitchCamera = () => {
    setCameraPosition(cameraPosition === 'back' ? 'front' : 'back');
  };

  if (!hasPermission) {
    return <Text>Camera permission required</Text>;
  }

  if (device == null) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <View style={styles.container}>
      {currentPhoto && (
        <>
          <Image
            source={{uri: currentPhoto.path}}
            style={[styles.camera, {zIndex: 10}]}
          />
        </>
      )}
      {renderMarker && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: positionFocus.y + 90, // Center the marker
              left: positionFocus.x - 40,
              zIndex: 10,
              height: 60,
              width: 60,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 100,
            },
            animatedStyle,
          ]}
        />
      )}
      <GestureDetector gesture={gesture}>
        <Camera
          exposure={0}
          ref={camera}
          format={format}
          photo
          style={styles.camera}
          device={device}
          isActive={isCameraActive}
        />
      </GestureDetector>

      <TouchableOpacity
        onPress={handleOnCancelPress}
        style={styles.cancelButtonContainer}>
        <Text style={styles.cancelButton}>
          {currentPhoto ? 'Retake' : 'Cancel'}
        </Text>
      </TouchableOpacity>

      {!currentPhoto && (
        <TouchableOpacity
          onPress={handleTakePhoto}
          style={styles.buttonTakePhotoContainer}>
          <View style={styles.buttonTakePhoto} />
        </TouchableOpacity>
      )}

      {!currentPhoto ? (
        <TouchableOpacity
          onPress={handleOnSwitchCamera}
          style={styles.switchCameraButton}>
          <SwitchCamera color={colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleUploadProfilePicture}
          style={styles.usePhotoContainer}>
          {meta.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.cancelButton}>{'Use photo'}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchCameraButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: colors.darkGray,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usePhotoContainer: {
    position: 'absolute',
    bottom: 105,
    right: 20,
  },
  cancelButtonContainer: {
    position: 'absolute',
    bottom: 105,
    left: 20,
  },
  cancelButton: {
    color: colors.white,
    fontSize: 18,
  },
  camera: {
    position: 'absolute',
    top: 120,
    right: 0,
    bottom: 200,
    left: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTakePhotoContainer: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 10,
  },
  buttonTakePhoto: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  backButton: {
    zIndex: 12,
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  /*   loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  }, */
});
