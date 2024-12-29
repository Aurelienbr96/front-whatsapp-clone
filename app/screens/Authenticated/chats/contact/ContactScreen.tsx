import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useGetContactQuery} from '../../../../api/contact/contactApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../router/AuthRouter';
import {CircleUserRound, X} from 'lucide-react-native';
import {colors} from '../../../../common/colors';
import {Header} from '../../../../common/components/fragments/Header';

type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Authenticated'
>;

const ContactScreen = () => {
  const {data} = useGetContactQuery();
  const navigate = useNavigation<RootNavigationProp>();

  const handleNavigateToChatScreen = (userId: string) => {
    navigate.goBack();
    setTimeout(() => {
      navigate.navigate('Authenticated', {
        screen: 'NewMessageScreen',
        params: {
          userId,
        },
      });
    }, 400);
  };

  const handleGoBack = () => {
    navigate.goBack();
  };

  return (
    <View style={styles.contactViewContainer}>
      <Header
        containerStyle={{paddingTop: 15}}
        renderRightIcon={() => (
          <TouchableOpacity
            style={styles.containerIconStyle}
            onPress={handleGoBack}>
            <X color={colors.gray60} />
          </TouchableOpacity>
        )}>
        New chat
      </Header>
      <View style={styles.contactContainerStyle}>
        {data?.map((contact, idx) => (
          <TouchableOpacity
            key={contact.id}
            style={[
              styles.contactCardStyle,
              idx > 0 ? styles.contactBorderTop : undefined,
            ]}
            onPress={() => handleNavigateToChatScreen(contact.id)}>
            {contact.avatar ? (
              <Image
                style={{height: 40, width: 40, borderRadius: 100}}
                source={{uri: contact.avatar}}
              />
            ) : (
              <CircleUserRound color={colors.black} />
            )}
            <View>
              <Text>{contact.phoneNumber}</Text>
              <Text>{contact.userName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactBorderTop: {
    borderTopColor: colors.black,
    borderTopWidth: 0.5,
  },
  contactCardStyle: {
    display: 'flex',

    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  contactContainerStyle: {
    paddingVertical: 10,

    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  containerIconStyle: {
    borderRadius: 100,
    padding: 3,
    backgroundColor: colors.gray30,
  },
  contactViewContainer: {
    padding: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ContactScreen;
