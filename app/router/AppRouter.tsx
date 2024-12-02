import React from 'react';
import AuthRouter from './AuthRouter';
import {NavigationContainer} from '@react-navigation/native';

const AppRouter = () => {
  return (
    <NavigationContainer>
      <AuthRouter />
    </NavigationContainer>
  );
};

export default AppRouter;
