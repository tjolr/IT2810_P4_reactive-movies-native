import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemeContext, ThemeProps } from 'react-native-elements';
import { IThemeObject } from '../../theme/theme.model';
import Reviews from './Reviews/Reviews';
import { IMovieListObject } from '../../GraphQL/models/movie.model';
import MovieDetails from './MovieDetails/MovieDetails';
import { LoadingAnimationChase } from '../Generic/loading';
import { useQuery } from '@apollo/client';
import { getDetailMovieQuery } from '../../GraphQL/QueryBuilder';
import Userfeedback from '../Generic/Userfeedback';

interface IDetailScreenProps {
  route: {
    params: {
      movieDetails: IMovieListObject;
    };
  };
}

const DetailsScreen = ({ route }: IDetailScreenProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const { movieDetails } = route.params;

  const { loading, error, data } = useQuery(getDetailMovieQuery(), {
    variables: {
      searchString: movieDetails.title != null ? movieDetails.title : '',
    },
  });

  if (loading)
    return (
      <View style={styles(theme).loadingContainer}>
        <LoadingAnimationChase />
      </View>
    );

  if (error)
    return (
      <View>
        <Userfeedback message="Error loading details" type="error" />
      </View>
    );

  let movieDetailsExtended: IMovieListObject = {
    ...movieDetails,
  };

  if (data.Movie.movies.length > 1) {
    data.Movie.movies.map((movie: IMovieListObject) => {
      if (movie._id === movieDetails._id) {
        movieDetailsExtended = {
          ...movieDetailsExtended,
          ...movie,
        };
      }
    });
  } else {
    movieDetailsExtended = {
      ...movieDetailsExtended,
      ...data.Movie.movies[0],
    };
  }

  return (
    <ScrollView style={styles(theme).container}>
      <StatusBar style="light" animated={true} />
      <MovieDetails movieDetails={movieDetailsExtended} />
      <Reviews movieId={movieDetails._id} />
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
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.colors.grey0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
