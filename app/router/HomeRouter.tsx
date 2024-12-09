/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen} from '../screens/Authenticated/chats/ChatScreen';
import {ProfileScreen} from '../screens/Authenticated/profile/ProfileScreen';
import {MessageCircle, UserRoundPen} from 'lucide-react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useGetScreenDimensions} from '../common/hook/useGetScreenDimensions';
import {colors} from '../common/colors';
import {Text} from 'react-native';

export type MessageStackParamList = {
  ChatList: undefined;
  /* Camera: undefined; */
};

const MessageStack = createNativeStackNavigator<MessageStackParamList>();
const Tab = createBottomTabNavigator();

const TabBarIcons = (
  route: RouteProp<ParamListBase, string>,
  focused: boolean,
) => {
  if (route.name === 'ChatList') {
    return (
      <MessageCircle
        color={focused ? colors.black : colors.mediumGray}
        size={24}
      />
    );
  } else if (route.name === 'Profile') {
    return (
      <UserRoundPen
        color={focused ? colors.black : colors.mediumGray}
        size={24}
      />
    );
  }
};
const TabBarText = (
  route: RouteProp<ParamListBase, string>,
  focused: boolean,
) => {
  return (
    <Text
      style={{
        color: focused ? colors.black : colors.mediumGray,
        fontSize: 12,
      }}>
      {route.name === 'ChatList' ? 'Messages' : 'Profile'}
    </Text>
  );
};

export function MyTabs() {
  const [dimensions] = useGetScreenDimensions();
  const animatedPosition = useSharedValue(dimensions.screen.height);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedPosition.value,
      [dimensions.screen.height, 0],
      [1, 0.9],
    );
    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[{flex: 1}, animatedStyle]}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => TabBarIcons(route, focused),
          tabBarStyle: {
            backgroundColor: colors.lightGray,
          },
          tabBarLabel: ({focused}) => TabBarText(route, focused),
          headerShown: false,
        })}>
        <MessageStack.Screen name="ChatList">
          {() => <ChatScreen animatedPosition={animatedPosition} />}
        </MessageStack.Screen>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </Animated.View>
  );
}

export type AuthenticatedStackParamList = {
  MyTabs: undefined;
  Contact: undefined;
  /* Camera: undefined; */
};

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedStackParamList>();

export function AuthenticatedRouter() {
  return (
    <AuthenticatedStack.Navigator initialRouteName="MyTabs">
      <AuthenticatedStack.Screen
        component={MyTabs}
        name="MyTabs"
        options={{headerShown: false}}
      />
    </AuthenticatedStack.Navigator>
  );
}
