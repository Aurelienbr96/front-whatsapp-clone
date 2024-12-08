import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGetMeQuery} from '../../../api/user/userApi';
import {colors} from '../../../common/colors';
import {Header} from '../../../common/components/fragments/Header';

export const ProfileScreen = () => {
  const {data} = useGetMeQuery();
  return (
    <View style={styles.container}>
      <Header>Edit profile</Header>
      <Text>{data?.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
