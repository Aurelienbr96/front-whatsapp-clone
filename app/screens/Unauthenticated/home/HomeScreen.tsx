import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {RootStackParamList} from '../../../router/AuthRouter';
import {Button} from '../../../common/components/ui/Button';
import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';
import {colors} from '../../../common/colors';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [dimensions] = useGetScreenDimensions();
  const {hasPermission, requestPermission} = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();
  const handleNavigateSignUpScreen = () => {
    navigation.navigate('SignUp');
  };
  const handleNavigateLoginScreen = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!hasMicrophonePermission) {
      requestMicrophonePermission();
    }
  });

  return (
    <SafeAreaView
      style={[styles.container, {height: dimensions.screen.height}]}>
      <Button style={styles.signUpButton} onPress={handleNavigateSignUpScreen}>
        Sign up
      </Button>
      <Button style={styles.loginButton} onPress={handleNavigateLoginScreen}>
        Login
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    marginTop: 4,
  },
  loginButton: {
    marginTop: 4,
  },
});
