import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '../../colors';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & TextInputProps;

export const ControlledTextInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          {...props}
          style={[styles.input, props.style]}
          onBlur={onBlur}
          onChangeText={phoneNumber => onChange(phoneNumber)}
          value={value}
        />
      )}
      name={name}
      rules={{required: true}}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 1,
  },
});
