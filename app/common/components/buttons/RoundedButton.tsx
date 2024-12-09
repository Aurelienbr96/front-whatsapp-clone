import React, {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {colors} from '../../colors';

export const RoundedButton = (
  props: PropsWithChildren<TouchableWithoutFeedbackProps>,
) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} {...props}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: 55,
    height: 55,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.mediumLightGray,
    borderRadius: 100,
  },
  text: {
    color: colors.darkGreen,
    textAlign: 'center',
    fontSize: 12,
  },
});
