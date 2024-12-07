import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../colors';
import {isIOS} from '../../utils/isIOS';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

type Props = {
  goBack?: boolean;
  renderRightIcon?: () => React.ReactNode;
};

export const Header = ({
  children,
  goBack,
  renderRightIcon,
}: PropsWithChildren<Props>) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleOnGoBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles({top}).container}>
      {goBack ? (
        <TouchableOpacity
          style={styles({top}).fakeContainer}
          onPress={handleOnGoBackPress}>
          <Text>Go back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles({top}).fakeContainer} />
      )}
      <View style={styles({top}).fakeContainer}>
        <Text style={styles({top}).headerText}>{children}</Text>
      </View>
      {renderRightIcon ? (
        <View
          style={[styles({top}).fakeContainer, {justifyContent: 'flex-end'}]}>
          {renderRightIcon()}
        </View>
      ) : (
        <View style={styles({top}).fakeContainer} />
      )}
    </View>
  );
};

const styles = ({top}: {top: number}) =>
  StyleSheet.create({
    fakeContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingTop: isIOS() ? top : 0,
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontWeight: '500',
      fontSize: 20,
    },
  });
