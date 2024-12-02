import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen} from '../screens/Authenticated/chats/ChatScreen';
import {ProfileScreen} from '../screens/Authenticated/profile/ProfileScreen';
import {CirclePlus, MessageCircle, UserRoundPen} from 'lucide-react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';

export type MessageStackParamList = {
  ChatList: undefined;
  /* Camera: undefined; */
};

const MessageStack = createNativeStackNavigator<MessageStackParamList>();
const Tab = createBottomTabNavigator();

const ChatListHeader = () => {
  return (
    <TouchableOpacity style={{marginRight: 10}}>
      <CirclePlus size={35} />
    </TouchableOpacity>
  );
};

const TabBarIcons = (
  route: RouteProp<ParamListBase, string>,
  focused: boolean,
) => {
  if (route.name === 'ChatList') {
    return <MessageCircle color={focused ? 'blue' : 'black'} size={24} />;
  } else if (route.name === 'Profile') {
    return <UserRoundPen color={focused ? 'blue' : 'black'} size={24} />;
  }
};

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <MessageStack.Screen
        options={() => ({
          headerRight: () => ChatListHeader(),
        })}
        name="ChatList"
        component={ChatScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
