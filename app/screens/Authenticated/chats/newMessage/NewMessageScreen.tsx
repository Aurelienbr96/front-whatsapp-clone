/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  InputAccessoryView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../../../common/colors';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {selectConversationState} from '../../../../redux/selector/conversationSliceSelector';
import {Message} from '../../../../redux/store/conversation.store';
import {selectUser} from '../../../../redux/selector/userSliceSelector';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const NewMessageScreen = () => {
  const inputAccessoryViewID = 'customAccessoryView';
  const [, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const conversation = useSelector(selectConversationState);
  const me = useSelector(selectUser);

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value}],
  }));

  const animatedFlatListStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value,
  }));

  const focusTextInput = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      focusTextInput();
    }, 400);
  }, []);

  const renderItem = ({item}: {item: Message}) => {
    const sendByMe = me.id === item.senderId;
    return (
      <View
        style={{
          backgroundColor: sendByMe ? colors.green20 : colors.white,
          alignSelf: sendByMe ? 'flex-end' : 'flex-start',
          padding: 10,
          marginHorizontal: 10,
          maxWidth: '70%',
          marginBottom: 10,
          borderRadius: 20,
        }}>
        <Text style={{fontSize: 17}}>{item.content}</Text>;
      </View>
    );
  };

  console.log('keyboard state', keyboard.state.value);

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require('../../../../assets/backgroundchat.png')}
      />
      <Animated.View style={[{flex: 1}, animatedFlatListStyle]}>
        <Animated.FlatList
          keyboardDismissMode="interactive"
          style={[
            {
              flex: 1,
              paddingBottom: 20,
            },
            animatedFlatListStyle,
          ]}
          renderItem={renderItem}
          data={conversation}
          keyboardShouldPersistTaps="handled"
        />
        <View style={[styles.inputContainer]}>
          <TextInput
            onFocus={() => setIsFocused(true)} // Triggered when input gains focus
            onBlur={() => setIsFocused(false)}
            inputAccessoryViewID={inputAccessoryViewID}
            accessibilityElementsHidden
            enablesReturnKeyAutomatically
            returnKeyType="done"
            keyboardAppearance="default"
            ref={inputRef}
            style={styles.inputStyle}
          />

          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View
              style={{
                height: 40,
                position: 'absolute',
                top: 0,
                backgroundColor: colors.white,
                width: Dimensions.get('screen').width,
              }}
            />
          </InputAccessoryView>
        </View>
      </Animated.View>
    </>
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
