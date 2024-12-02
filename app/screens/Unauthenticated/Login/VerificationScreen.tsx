import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';

import {ApiError, useLoginMutation} from '../../../api/auth/authApi';

import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';
import {ValidateOTPInput} from '../../../common/components/input/ValidateOTMInput';
import {useNavigation} from '@react-navigation/native';

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    error.data !== null &&
    'message' in (error as any).data
  );
};

const transformApiError = (error: unknown): string => {
  if (isApiError(error)) {
    return error.data.message;
  }
  return 'An unknown error happened';
};

export const VerificationScreen = ({phoneNumber}: {phoneNumber: string}) => {
  const navigation = useNavigation();
  const [dimensions] = useGetScreenDimensions();
  const [sendCode, {isSuccess, isLoading, isError, error}] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('More');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isSuccess) {
  }

  if (isSuccess) {
    return <Text>Success!</Text>;
  }

  return (
    <SafeAreaView
      style={[styles.container, {height: dimensions.screen.height}]}>
      <Text>Enter your code</Text>
      <ValidateOTPInput
        otpLength={6}
        callBack={code => sendCode({code, phoneNumber})}
      />
      {isLoading && <ActivityIndicator />}
      {isError && <Text>{transformApiError(error)}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 4,
  },
  input: {
    marginTop: 4,
  },
});
