/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Contacts from 'expo-contacts';

import {Header} from '../../../common/components/fragments/Header';
import {CirclePlus} from 'lucide-react-native';

import {colors} from '../../../common/colors';
import {useSyncContactsMutation} from '../../../api/user/userApi';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/selector/userSliceSelector';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../router/AuthRouter';
import {useNavigation} from '@react-navigation/native';

const OpenContactIcon = ({handleOnPress}: {handleOnPress: () => void}) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <CirclePlus color={colors.green} size={30} />
    </TouchableOpacity>
  );
};

type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authenticated'
>;

export const ChatScreen = () => {
  const navigate = useNavigation<RootNavigationProp>();

  const [syncContact] = useSyncContactsMutation();
  const user = useSelector(selectUser);

  const handlePresentModalPress = useCallback(() => {
    navigate.navigate('Authenticated', {
      screen: 'ContactScreen',
    });
  }, []);

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
          const phoneNumbers = [];
          for (const contact of data) {
            if (!contact.phoneNumbers) {
              continue;
            }
            for (const phoneNumber of contact.phoneNumbers) {
              if (phoneNumber !== undefined && phoneNumber.number) {
                phoneNumbers.push(phoneNumber.number);
              }
            }
          }
          syncContact({phoneNumbers, ownerId: user.id});
        }
      }
    })();
  }, []);

  return (
    <View style={[styles.container]}>
      <Header
        renderRightIcon={() => (
          <OpenContactIcon handleOnPress={handlePresentModalPress} />
        )}>
        Messages
      </Header>
      <Text>Home</Text>
    </View>
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
