import React from 'react';
import {useQuery} from '@apollo/client';
import {buildMovieQuery} from '../../../GraphQL/QueryBuilder';
import {useSelector, RootStateOrAny} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import MovieListItem from './MovieListItem';
import {MovieListObject} from '../../../GraphQL/models/movieModels';

const MovieList = () => {
  const searchStringRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.searchString
  );
  const pageRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.page
  );
  const filterRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.filter
  );
  const sortRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.sort
  );

  const {loading, error, data} = useQuery(buildMovieQuery(), {
    variables: {
      searchString: searchStringRedux !== undefined ? searchStringRedux : '',
      page: pageRedux,
      filter: filterRedux,
      sort: sortRedux,
    },
  });

  if (loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text h4>Error while loading data!</Text>
        <Text>Reason: ${error.message}</Text>
      </View>
    );

  if (data) {
    console.log(data);
  }

  return (
    <View>
      {data &&
        data.Movie.movies.map((row: MovieListObject) => (
          <MovieListItem row={row} key={row.id} />
        ))}
    </View>
  );
};

export default MovieList;
