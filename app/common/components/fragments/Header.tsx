import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

export const Header = ({children}: PropsWithChildren) => {
  return <View>{children}</View>;
};
