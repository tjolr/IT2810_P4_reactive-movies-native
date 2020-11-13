import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext, ThemeProps, Text } from 'react-native-elements';
import { IThemeObject } from '../../../../../theme/theme.model';
import { RatingSlider, ReleaseYearSlider } from './MovieFilterSliders';

const MovieFilter = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View>
      <Text style={{ color: 'white' }}>FILTER</Text>
      <Text style={styles(theme).sliderHeaderText}>Rating</Text>
      <RatingSlider />
      <Text style={styles(theme).sliderHeaderText}>Release year</Text>
      <ReleaseYearSlider />
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    sliderHeaderText: {
      alignSelf: 'center',
      bottom: -10,
    },
  });

export default MovieFilter;
