import React from 'react';
import AuthRouter from './AuthRouter';
import {NavigationContainer} from '@react-navigation/native';

import {useGetMeQuery} from '../api/user/userApi';

const AppRouter = () => {
  useGetMeQuery();
  return (
    <NavigationContainer>
      <AuthRouter />
    </NavigationContainer>
  );
};

export default AppRouter;
