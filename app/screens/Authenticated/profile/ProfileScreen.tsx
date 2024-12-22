import React, {useCallback, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors} from '../../../common/colors';
import {Header} from '../../../common/components/fragments/Header';

import {formatPhoneNumberToInternationalFormat} from '../../../common/utils/phoneNumber.utils';
import {Subtitle} from '../../../common/components/text/Subtitle';
import {WhiteCardContainer} from '../../../common/components/cards/WhiteCardContainer';
import {RoundedButton} from '../../../common/components/buttons/RoundedButton';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import MediaChoiceBottomSheet from './components/MediaChoiceBottomSheet';
import {useGetMeQuery} from '../../../api/user/userApi';

export const ProfileScreen = () => {
  const {data} = useGetMeQuery();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenMediaChoiceBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <Header>Edit profile</Header>

      <WhiteCardContainer style={{marginTop: 30}}>
        <View style={styles.photoContainer}>
          <RoundedButton onPress={handleOpenMediaChoiceBottomSheet}>
            {data?.avatar ? (
              <Image
                style={{height: 55, width: 55}}
                source={{
                  uri: data?.avatar,
                }}
              />
            ) : (
              <Text style={styles.textButton}>add photo</Text>
            )}
          </RoundedButton>
          <Text style={{marginLeft: 20}}>
            Enter your name and add an optional profile picture
          </Text>
        </View>
      </WhiteCardContainer>
      <Subtitle style={styles.phoneNumberSubtitle}>Phone number</Subtitle>
      <WhiteCardContainer style={styles.phoneNumberContainer}>
        <Text style={styles.text}>
          {formatPhoneNumberToInternationalFormat(data?.phoneNumber || '')}
        </Text>
      </WhiteCardContainer>
      <MediaChoiceBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flexDirection: 'row',
    width: 250,
    gap: 4,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
  },
  phoneNumberContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  textButton: {
    margin: 10,
    color: colors.darkGreen,
    textAlign: 'center',
    fontSize: 12,
  },
  phoneNumberSubtitle: {
    marginTop: 30,
    marginLeft: 15,
  },
});
