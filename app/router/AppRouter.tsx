import React from 'react';
import AuthRouter from './AuthRouter';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../common/colors';
import {useGetMeQuery} from '../api/user/userApi';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.black,
  },
};

const AppRouter = () => {
  useGetMeQuery();
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthRouter />
    </NavigationContainer>
  );
};

export default AppRouter;
