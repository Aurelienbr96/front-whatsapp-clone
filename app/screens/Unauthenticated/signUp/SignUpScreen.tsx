import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import {useSignUpMutation} from '../../../api/auth/userApi';
import {Button} from '../../../common/components/ui/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ControlledTextInput} from '../../../common/components/input/TextInput';
import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';
import {VerificationScreen} from '../Login/VerificationScreen';

type Input = {
  phoneNumber: string;
};

export const SignUpScreen = () => {
  const [dimensions] = useGetScreenDimensions();
  const {handleSubmit, control, getValues} = useForm<Input>();
  const [createOne, result] = useSignUpMutation();
  const onSubmit = (data: Input) => {
    createOne(data);
  };

  if (result.isSuccess) {
    return <VerificationScreen phoneNumber={getValues().phoneNumber} />;
  }

  return (
    <SafeAreaView
      style={[styles.container, {height: dimensions.screen.height}]}>
      <Text>Sign up</Text>
      <ControlledTextInput
        style={styles.input}
        control={control}
        placeholder="Enter your phone number"
        name="phoneNumber"
      />

      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
        {result.isLoading ? 'Loading...' : 'Register'}
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
  input: {
    marginTop: 4,
  },
});
