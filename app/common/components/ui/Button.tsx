import React, {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import {colors} from '../../colors';
import {fontFamilies} from '../../fonts';

type Props = {} & TouchableOpacityProps;

export const Button = ({children, ...props}: PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text style={[styles.text, {fontFamily: fontFamilies.ROBOTO.normal}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkGray,
    paddingVertical: 8,
    paddingHorizontal: 3,
    borderRadius: 15,
    width: 200,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
});
