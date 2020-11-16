import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { buildMovieQuery } from '../../../GraphQL/QueryBuilder';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import MovieListItem from './MovieListItem';
import { IMovieListObject } from '../../../GraphQL/models/movie.model';
import { IThemeObject } from '../../../theme/theme.model';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setSearchIsLoading, setTotalRowCount } from '../../../redux/actions';
import { LoadingAnimationBounce } from '../../Generic/loading';

import { Icon } from 'react-native-elements';

const MovieList = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();
  const searchStringRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.searchString
  );
  const pageRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.pagination.page
  );
  const filterRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.filter
  );
  const sortRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.sort
  );

  const searchIsLoadingRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.searchIsLoading
  );

  const { loading, error, data, refetch } = useQuery(buildMovieQuery(), {
    variables: {
      searchString: searchStringRedux !== undefined ? searchStringRedux : '',
      page: pageRedux,
      filter: filterRedux,
      sort: sortRedux,
    },
  });

  useEffect(() => {
    if (!loading && searchIsLoadingRedux) {
      // Stops showing loadingspinner in searchBar
      // when data is found :-)
      dispatch(setSearchIsLoading(false));
    }
    data && dispatch(setTotalRowCount(data.Movie.totalRowCount));
  }, [data]);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LoadingAnimationBounce />
      </View>
    );

  if (error)
    return (
      <View
        style={[styles(theme).noMoviewsContainer, { backgroundColor: 'red' }]}
      >
        <Icon name="warning" containerStyle={{ margin: 5 }} />
        <Text h4>Error loading movies</Text>
      </View>
    );

  return (
    <ScrollView>
      {data && data.Movie.movies.length > 0 ? (
        data.Movie.movies.map((row: IMovieListObject, index: number) => (
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
        ))
      ) : (
        <View
          style={[
            styles(theme).noMoviewsContainer,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          <Icon name="warning" containerStyle={{ margin: 5 }} />
          <Text h4> No movies matching your filter</Text>
        </View>
      )}
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
    noMoviewsContainer: {
      margin: 15,
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

export default MovieList;
