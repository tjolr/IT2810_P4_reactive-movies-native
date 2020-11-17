import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeContext, ThemeProps } from 'react-native-elements';
import { IThemeObject } from '../../theme/theme.model';
import Reviews from './Reviews/Reviews';
import { IMovieListObject } from '../../GraphQL/models/movie.model';
import TitleBar, { ITitleBarProps } from './TitleBar/TitleBar';
import Description, { IDescriptionProps } from './Description/Description';
import Crew, { ICrewProps } from './Crew/Crew';

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

  const TitleBarProp: ITitleBarProps = {
    title: movieDetails.title,
    release_date: movieDetails.release_date,
    vote_average: movieDetails.vote_average,
    vote_count: movieDetails.vote_count,
    runtime: movieDetails.runtime,
  };

  const DescriptionProp: IDescriptionProps = {
    overview: movieDetails.overview,
    genres: movieDetails.genres,
    tagline: movieDetails.tagline,
  };

  const CrewProp: ICrewProps = {
    crew: movieDetails.crew,
  };

  return (
    <ScrollView style={styles(theme).container}>
      <StatusBar style="light" animated={true} />
      <TitleBar {...TitleBarProp} />
      <Description {...DescriptionProp} />
      <Crew {...CrewProp} />
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
  });
