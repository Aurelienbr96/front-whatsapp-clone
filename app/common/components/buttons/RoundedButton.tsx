import React, {PropsWithChildren} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {colors} from '../../colors';

export const RoundedButton = (
  props: PropsWithChildren<TouchableWithoutFeedbackProps>,
) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
