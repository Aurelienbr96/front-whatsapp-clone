import React from 'react';
import {CameraEditProfile} from '../screens/Authenticated/profile/cameraEditProfile/CameraEditProfile';
import {GalleryEditProfilePictureScreen} from '../screens/Authenticated/profile/galleryEditProfile/GalleryEditProfilePictureScreen';
import {SelectedImageScreen} from '../screens/Authenticated/profile/galleryEditProfile/selectedImage/SelectedImageScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabsRouter, MessageStackParamList} from './HomeTabsRouter';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NewMessageScreen} from '../screens/Authenticated/chats/newMessage/NewMessageScreen';
import ContactScreen from '../screens/Authenticated/chats/contact/ContactScreen';

export type AuthenticatedStackParamList = {
  HomeTabsRouter: BottomTabScreenProps<MessageStackParamList>;
  CameraEditProfilePicture: undefined;
  GalleryEditProfilePicture: undefined;
  NewMessageScreen: {userId: string};
  ContactScreen: undefined;
  SelectedImageScreen: {image: string};
};

const AuthenticatedStack = createStackNavigator<AuthenticatedStackParamList>();

export function AuthenticatedRouter() {
  return (
    <AuthenticatedStack.Navigator
      initialRouteName="HomeTabsRouter"
      screenOptions={{headerShown: false}}>
      <AuthenticatedStack.Screen
        component={HomeTabsRouter}
        name="HomeTabsRouter"
      />
      <AuthenticatedStack.Screen
        name="CameraEditProfilePicture"
        component={CameraEditProfile}
        options={{presentation: 'card', animation: 'slide_from_bottom'}}
      />
      <AuthenticatedStack.Screen
        name="GalleryEditProfilePicture"
        component={GalleryEditProfilePictureScreen}
        options={{presentation: 'modal'}}
      />
      <AuthenticatedStack.Screen
        name="SelectedImageScreen"
        component={SelectedImageScreen}
        options={{presentation: 'card'}}
      />
      <AuthenticatedStack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{presentation: 'card'}}
      />
      <AuthenticatedStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{presentation: 'modal'}}
      />
    </AuthenticatedStack.Navigator>
  );
}
