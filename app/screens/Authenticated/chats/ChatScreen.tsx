import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Contacts from 'expo-contacts';

import ContactScreen from './contact/ContactScreen';

type ContactToSync = Array<{
  phoneNumbers?: Array<string | undefined>;
}>;

export const ChatScreen = () => {
  const handleOpenSheet = () => {};

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
          const contacts: ContactToSync = data.map(contact => ({
            phoneNumbers: contact.phoneNumbers?.map(p => p.number),
          }));
          console.log(contacts);
        }
      }
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <ContactScreen />
      <TouchableOpacity onPress={handleOpenSheet}>
        <Text>Open sheet</Text>
      </TouchableOpacity>
    </View>
  );
};
