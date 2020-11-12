import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';
import {buildMovieQuery} from '../../../GraphQL/QueryBuilder';
import {useSelector, RootStateOrAny} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {Text, ThemeContext, ThemeProps} from 'react-native-elements';
import MovieListItem from './MovieListItem';
import {MovieListObject} from '../../../GraphQL/models/movie.model';
import {IThemeObject} from '../../../theme/theme.model';
import EStyleSheet from 'react-native-extended-stylesheet';

const MovieList = () => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);
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

  return (
    <ScrollView>
      {data &&
        data.Movie.movies.map((row: MovieListObject, index: number) => (
          <View
            style={EStyleSheet.child(
              styles(theme),
              'movieListItemContainer',
              index,
              data.Movie.movies.length
            )}
            key={index}
          >
            <MovieListItem row={row} />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    'movieListItemContainer:nth-child-even': {
      backgroundColor: theme.colors.grey3,
    },
    'movieListItemContainer:nth-child-odd': {
      backgroundColor: theme.colors.grey1,
    },
  });

export default MovieList;
