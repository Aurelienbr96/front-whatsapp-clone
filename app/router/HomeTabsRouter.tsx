import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useGetScreenDimensions} from '../common/hook/useGetScreenDimensions';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen} from '../screens/Authenticated/chats/ChatScreen';
import {ProfileScreen} from '../screens/Authenticated/profile/ProfileScreen';
import {colors} from '../common/colors';
import {TabBarIcons} from './components/TabBarIcon';
import {TabBarText} from './components/TabBarText';

export type MessageStackParamList = {
  ChatList: undefined;
  Profile: undefined;
  /* Camera: undefined; */
};

const MessageStack = createNativeStackNavigator<MessageStackParamList>();
const Tab = createBottomTabNavigator();

export function HomeTabsRouter() {
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
        <MessageStack.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </Animated.View>
  );
}
