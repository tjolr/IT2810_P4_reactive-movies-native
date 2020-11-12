import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import {MovieListObject} from '../../../GraphQL/models/movie.model';
import {getFullYearNumber} from '../../../utils/dates';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

interface IMovieListItemProps {
  row: MovieListObject;
}

const MovieListItem = (props: IMovieListItemProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {movieDetails: props.row})}
    >
      <View style={styles.movieInfoContainer}>
        <Text style={styles.title}>
          {props.row.title}

          {props.row.release_date && (
            <Text style={styles.release_date}>
              {' '}
              ({getFullYearNumber(props.row.release_date)})
            </Text>
          )}
        </Text>
        {props.row.vote_average && (
          <Text style={{marginTop: 3}}>
            User rating: {props.row.vote_average}
          </Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <Icon name="keyboard-arrow-right" size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  release_date: {
    fontWeight: 'normal',
  },
  movieInfoContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 40,
  },
});

export default MovieListItem;
