import React from 'react';
import {CameraEditProfile} from '../screens/Authenticated/profile/cameraEditProfile/CameraEditProfile';
import {GalleryEditProfilePictureScreen} from '../screens/Authenticated/profile/galleryEditProfile/GalleryEditProfilePictureScreen';
import {SelectedImageScreen} from '../screens/Authenticated/profile/galleryEditProfile/selectedImage/SelectedImageScreen';
import {CameraRollImageType} from '../type/camera-roll/react-native-camera-role.type';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabsRouter, MessageStackParamList} from './HomeTabsRouter';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type AuthenticatedStackParamList = {
  HomeTabsRouter: BottomTabScreenProps<MessageStackParamList>;
  CameraEditProfilePicture: undefined;
  GalleryEditProfilePicture: undefined;
  SelectedImageScreen: {image: CameraRollImageType};
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
    </AuthenticatedStack.Navigator>
  );
}
