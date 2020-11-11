import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {MovieListObject} from '../../../GraphQL/models/movieModels';

interface IMovieListItemProps {
  row: MovieListObject;
  key: number;
}

const MovieListItem = (props: IMovieListItemProps) => {
  return (
    <View>
      <Text>{props.row.title}</Text>
    </View>
  );
};

export default MovieListItem;
