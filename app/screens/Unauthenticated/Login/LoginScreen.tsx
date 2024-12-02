import React from 'react';
import {StyleSheet} from 'react-native';

import {useForm} from 'react-hook-form';
import {VerificationScreen} from './VerificationScreen';
import {useSendCodeMutation} from '../../../api/auth/authApi';
import {ControlledTextInput} from '../../../common/components/input/TextInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../../common/components/ui/Button';
import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';

type Input = {
  phoneNumber: string;
};

export const LoginScreen = () => {
  const [dimensions] = useGetScreenDimensions();
  const [sendCode, result] = useSendCodeMutation();
  const {handleSubmit, control, getValues} = useForm<Input>();

  const onSubmit = (data: Input) => {
    sendCode(data);
  };

  if (result.isSuccess) {
    return <VerificationScreen phoneNumber={getValues().phoneNumber} />;
  }

  return (
    <SafeAreaView
      style={[styles.container, {height: dimensions.screen.height}]}>
      <ControlledTextInput
        control={control}
        placeholder="Enter your phone number"
        name="phoneNumber"
      />
      <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
        {result.isLoading ? 'Loading...' : 'Send code'}
      </Button>
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
});
