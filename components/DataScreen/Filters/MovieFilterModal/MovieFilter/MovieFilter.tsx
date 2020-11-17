import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { RatingSlider, ReleaseYearSlider } from './MovieFilterSliders';

const MovieFilter = () => {
  return (
    <View>
      <Text style={{ color: 'white' }}>FILTER</Text>
      <Text style={styles.sliderHeaderText}>Rating</Text>
      <RatingSlider />
      <Text style={styles.sliderHeaderText}>Release year</Text>
      <ReleaseYearSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderHeaderText: {
    alignSelf: 'center',
    bottom: -10,
  },
});

export default MovieFilter;
