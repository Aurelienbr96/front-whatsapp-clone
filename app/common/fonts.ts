import {isIOS} from './utils/isIOS';

export const fontFamilies = {
  ROBOTO: {
    normal: isIOS() ? 'Roboto-Regular' : 'RobotoRegular',
    medium: isIOS() ? 'Roboto-Medium' : 'RobotoMedium',
    bold: isIOS() ? 'Roboto-Bold' : 'RobotoBold',
  },
  // Adjust the above code to fit your chosen fonts' names
};
