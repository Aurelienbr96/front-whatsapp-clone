import {ParamListBase, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../common/colors';

export const TabBarText = (
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
