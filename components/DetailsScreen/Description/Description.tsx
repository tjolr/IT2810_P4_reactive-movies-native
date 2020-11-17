import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { IGenre } from '../../../GraphQL/models/movie.model';
import GenreTag from './GenreTag';

export interface IDescriptionProps {
  overview: string;
  genres: IGenre[];
  tagline: string;
}

const Description = (props: IDescriptionProps) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontStyle: 'italic' }}>{props.tagline}</Text>
      <View style={styles.genreContainer}>
        {/* If there are genres, map them out with <GenreTag> */}
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
    paddingTop: 10,
  },
  genre: {
    marginRight: 5,
    marginBottom: 5,
  },
});
