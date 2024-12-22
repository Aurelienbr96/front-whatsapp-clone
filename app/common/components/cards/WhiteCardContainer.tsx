import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {colors} from '../../colors';

export const WhiteCardContainer = (props: PropsWithChildren<ViewProps>) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
  },
});
