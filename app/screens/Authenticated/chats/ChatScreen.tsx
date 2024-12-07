import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Contacts from 'expo-contacts';

import ContactScreen from './contact/ContactScreen';
import {Header} from '../../../common/components/fragments/Header';
import {CirclePlus} from 'lucide-react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {colors} from '../../../common/colors';
import {useGetScreenDimensions} from '../../../common/hook/useGetScreenDimensions';

/* type ContactToSync = Array<{
  phoneNumbers?: Array<string | undefined>;
}>; */

const OpenContactIcon = ({handleOnPress}: {handleOnPress: () => void}) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <CirclePlus size={30} />
    </TouchableOpacity>
  );
};

export const ChatScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dimensions] = useGetScreenDimensions();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const animatedPosition = useSharedValue(dimensions.screen.height);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedPosition.value,
      [dimensions.screen.height, 0],
      [1, 0.9],
    );
    return {
      transform: [{scale}],
    };
  });

  useEffect(() => {
    (async () => {
      const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.FirstName,
          ],
        });

        if (data.length > 0) {
          data.map(contact => ({
            phoneNumbers: contact.phoneNumbers?.map(p => p.number),
          }));
          /* console.log(contacts); */
        }
      }
    })();
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Header
        renderRightIcon={() => (
          <OpenContactIcon handleOnPress={handlePresentModalPress} />
        )}>
        Messages
      </Header>
      <Text>Home</Text>
      <ContactScreen
        animatedPosition={animatedPosition}
        bottomSheetModalRef={bottomSheetModalRef}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
});
