import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AuthenticatedStackParamList} from '../../../../../router/AuthenticatedRouter';
import {screenDimensions} from '../../../../../common/hook/useGetScreenDimensions';
import {StackScreenProps} from '@react-navigation/stack';

type SelectedImageScreenProps = StackScreenProps<
  AuthenticatedStackParamList,
  'SelectedImageScreen'
>;

export const SelectedImageScreen = ({route}: SelectedImageScreenProps) => {
  const {image} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{uri: image.uri}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    marginTop: 20,
    height: 500,
    width: screenDimensions.width,
  },
});
