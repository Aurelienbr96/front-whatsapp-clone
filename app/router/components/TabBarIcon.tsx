import React from 'react';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {MessageCircle, UserRoundPen} from 'lucide-react-native';
import {colors} from '../../common/colors';

export const TabBarIcons = (
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
