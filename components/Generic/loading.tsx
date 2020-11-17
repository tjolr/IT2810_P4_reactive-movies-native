import React, { useContext } from 'react';
import { Bounce, Chase, Swing } from 'react-native-animated-spinkit';
import { ThemeContext, ThemeProps } from 'react-native-elements';

export const LoadingAnimationBounce = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  return <Bounce size={250} color={theme.colors.primary} />;
};

export const LoadingAnimationSwing = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  return <Swing size={150} color={theme.colors.primary} />;
};

export const LoadingAnimationChase = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  return <Chase size={50} color={theme.colors.primary} />;
};
