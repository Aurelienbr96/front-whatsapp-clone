import React from 'react';
import AuthRouter from './AuthRouter';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../common/colors';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.black,
  },
};

const AppRouter = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthRouter />
    </NavigationContainer>
  );
};

export default AppRouter;
