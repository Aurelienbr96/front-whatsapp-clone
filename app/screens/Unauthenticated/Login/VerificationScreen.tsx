import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';

import {useLoginMutation} from '../../../api/auth/authApi';

import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';
import {ValidateOTPInput} from '../../../common/components/input/ValidateOTMInput';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../common/colors';
import {transformApiError} from '../../../api/apiError';

export const VerificationScreen = ({phoneNumber}: {phoneNumber: string}) => {
  const navigation = useNavigation();
  const [dimensions] = useGetScreenDimensions();
  const [sendCode, {isSuccess, isLoading, isError, error}] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
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
    backgroundColor: colors.white,
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
