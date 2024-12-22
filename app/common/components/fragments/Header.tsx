import React, {PropsWithChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

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
  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingTop: isIOS() ? top + 10 : 10,
    paddingHorizontal: 10,
    alignItems: 'center', // Valid FlexAlignType
    justifyContent: 'space-between', // Valid FlexAlignType
  };
  return (
    <View style={containerStyle}>
      {goBack ? (
        <TouchableOpacity
          style={styles.fakeContainer}
          onPress={handleOnGoBackPress}>
          <Text>Go back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.fakeContainer} />
      )}
      <View style={styles.fakeContainer}>
        <Text style={styles.headerText}>{children}</Text>
      </View>
      {renderRightIcon ? (
        <View style={[styles.fakeContainer, {justifyContent: 'flex-end'}]}>
          {renderRightIcon()}
        </View>
      ) : (
        <View style={styles.fakeContainer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fakeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
