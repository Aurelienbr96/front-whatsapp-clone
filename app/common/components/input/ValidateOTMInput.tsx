import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../colors';

// text input holds the state of the OTP
// buttons display the text one by one
// each value inside the buttons is linked with one part of the string input

type Props = {
  otpLength: number;
  callBack: (code: string) => void;
};

export const ValidateOTPInput = ({otpLength, callBack}: Props) => {
  const [code, setCode] = useState<string>('');
  const mapCodeToButton = (i: number) => {
    if (!code[i]) {
      return '';
    }
    return code[i];
  };

  useEffect(() => {
    if (code.length === otpLength) {
      callBack(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleChange = (text: string) => {
    // Update state only if length does not exceed otpLength
    if (text.length <= otpLength) {
      setCode(text);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(otpLength)].map((_, i) => (
        <View key={i} style={styles.textContainer}>
          <Text style={styles.text}>{mapCodeToButton(i)}</Text>
        </View>
      ))}
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleChange}
        value={code}
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    opacity: 0,
    position: 'absolute',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  textContainer: {
    height: 60,
    width: 40,
    borderRadius: 10,
    borderColor: colors.darkGray,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
