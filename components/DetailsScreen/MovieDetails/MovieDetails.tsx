import React from 'react';
import { View } from 'react-native';
import { IMovieListObject } from '../../../GraphQL/models/movie.model';
import Crew, { ICrewProps } from '../Crew/Crew';
import Description, { IDescriptionProps } from '../Description/Description';
import TitleBar, { ITitleBarProps } from '../TitleBar/TitleBar';

interface IMovieDetailsProps {
  movieDetails: IMovieListObject;
}

const MovieDetails = ({ movieDetails }: IMovieDetailsProps) => {
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
    <View>
      <TitleBar {...TitleBarProp} />
      <Description {...DescriptionProp} />
      <Crew {...CrewProp} />
    </View>
  );
};

export default MovieDetails;
