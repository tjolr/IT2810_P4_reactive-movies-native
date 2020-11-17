import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { IGenre } from '../../../GraphQL/models/movie.model';
import GenreTag from './GenreTag';

export interface IDescriptionProps {
  overview: string;
  genres: IGenre[];
}

const Description = (props: IDescriptionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.genreContainer}>
        {props.genres.length > 0 ? (
          props.genres.map((genre: IGenre, index: number) => (
            <View style={styles.genre} key={index}>
              <GenreTag name={genre.name} />
            </View>
          ))
        ) : (
          <GenreTag name="No known genres" />
        )}
      </View>
      <Text>{props.overview}</Text>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    marginRight: 5,
    marginBottom: 5,
  },
});
