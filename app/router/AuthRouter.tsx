import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Unauthenticated/home/HomeScreen';
import {SignUpScreen} from '../screens/Unauthenticated/signUp/SignUpScreen';
import {LoginScreen} from '../screens/Unauthenticated/Login/LoginScreen';
import {AuthenticatedRouter} from './HomeRouter';

/* import {CameraScreen} from '../screens/camera/CameraScreen'; */

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  More: undefined;
  /* Camera: undefined; */
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthRouter(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="More">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{headerShown: false}}
        /> */}
      <Stack.Screen
        name="More"
        component={AuthenticatedRouter}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthRouter;
