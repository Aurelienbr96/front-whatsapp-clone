import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Unauthenticated/home/HomeScreen';
import {SignUpScreen} from '../screens/Unauthenticated/signUp/SignUpScreen';
import {LoginScreen} from '../screens/Unauthenticated/Login/LoginScreen';
import {AuthenticatedRouter} from './HomeRouter';

import {selectIsLoggedIn} from '../redux/selector/userSliceSelector';
import {useSelector} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  More: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthRouter(): React.JSX.Element {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return;
    }

    if (isLoggedIn) {
      // Navigate to authenticated stack
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'More',
            },
          ],
        }),
      );
    } else {
      // Navigate to unauthenticated stack
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Home',
            },
          ],
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="More"
        component={AuthenticatedRouter}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthRouter;
