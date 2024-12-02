import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const CameraScreen: React.FC = () => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const {hasPermission} = useCameraPermission();
  const [currentPhoto, setCurrentPhoto] = useState<PhotoFile>();
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleTakePhoto = async () => {
    setIsLoading(true);
    const photo = await camera.current?.takePhoto();
    setCurrentPhoto(photo);
    fadeIn();
  };

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleRemoveCurrentPhoto = () => {
    setCurrentPhoto(undefined);
  };

  if (!hasPermission) {
    return <Text>Camera permission required</Text>;
  }

  if (device == null) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      {currentPhoto ? (
        <>
          <Animated.Image
            onLoadStart={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => setIsLoading(false)}
            source={{uri: currentPhoto.path}}
            style={[StyleSheet.absoluteFill, {opacity: fadeAnim}]}
          />

          <TouchableOpacity
            onPress={handleRemoveCurrentPhoto}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>X</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Camera
          ref={camera}
          photo
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}

      <TouchableOpacity
        style={styles.buttonTakePhoto}
        onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTakePhoto: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  backButton: {
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
});
