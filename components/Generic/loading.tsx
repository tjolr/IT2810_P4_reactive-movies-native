import React, {useContext} from 'react';
import {Bounce} from 'react-native-animated-spinkit';
import {ThemeContext, ThemeProps} from 'react-native-elements';

const LoadingAnimation = () => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);
  return <Bounce size={250} color={theme.colors.primary} />;
};

export default LoadingAnimation;
