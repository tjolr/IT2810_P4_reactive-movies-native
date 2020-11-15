import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import { IThemeObject } from '../../theme/theme.model';
import { getFullYearNumber } from '../../utils/dates';
import Reviews from './Reviews/Reviews';

const DetailsScreen = ({ route }: any) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <ScrollView style={styles(theme).container}>
      <StatusBar style="light" animated={true} />
      <View style={{ padding: 20 }}>
        <Text h2>{route.params.movieDetails.title}</Text>
        <Text h4>
          Release year:{' '}
          {getFullYearNumber(route.params.movieDetails.release_date)}
        </Text>
        <Text h4>User rating: {route.params.movieDetails.vote_average}</Text>
      </View>
      <Reviews movieId={route.params.movieDetails._id} />
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.grey0,
    },
  });
