import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors} from '../../colors';

export const Subtitle = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.mediumDarkGray,
  },
});
