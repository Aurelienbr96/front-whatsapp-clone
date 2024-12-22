import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const windowDimensions = Dimensions.get('window');
export const screenDimensions = Dimensions.get('screen');

export const useGetScreenDimensions = () => {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  return [dimensions];
};
