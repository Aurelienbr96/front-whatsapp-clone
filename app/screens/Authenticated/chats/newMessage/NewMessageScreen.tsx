import React, {useEffect, useRef} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../../../common/colors';
import {Dimensions} from 'react-native';

export const NewMessageScreen = () => {
  const inputRef = useRef<TextInput>(null);

  const focusTextInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      focusTextInput();
    }, 300);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require('../../../../assets/backgroundchat.png')}
      />
      <View style={{flex: 1}} />
      <View style={styles.inputContainer}>
        <TextInput
          returnKeyType="none"
          ref={inputRef}
          style={styles.inputStyle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputContainer: {
    backgroundColor: colors.white,
  },
  inputStyle: {
    height: 40,

    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  background: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover', // Ensure the image covers the entire view
  },
});
