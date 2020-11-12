import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, ThemeContext, ThemeProps} from 'react-native-elements';
import {IThemeObject} from '../../theme/theme.model';
import {getFullYearNumber} from '../../utils/dates';

const DetailsScreen = ({route}: any) => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <StatusBar style="light" animated={true} />
      <Text h2>{route.params.movieDetails.title}</Text>
      <Text h4>
        Release year:{' '}
        {getFullYearNumber(route.params.movieDetails.release_date)}
      </Text>
      <Text h4>User rating: {route.params.movieDetails.vote_average}</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: theme.colors.grey0,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });
