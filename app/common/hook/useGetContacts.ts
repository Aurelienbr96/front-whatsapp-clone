/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import * as Contacts from 'expo-contacts';

type ContactToSync = Array<{
  phoneNumbers?: Array<string | undefined>;
}>;

export const useGetContacts = () => {
  let contacts: ContactToSync = [];
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
          contacts = data.map(contact => ({
            phoneNumbers: contact.phoneNumbers?.map(p => p.number),
          }));
          /* console.log(contacts); */
        }
      }
    })();
  }, []);
  return contacts;
};
