import React from 'react';
import {View} from 'react-native';
import SearchField from './SearchField/SearchField';
import MovieFilters from './MovieFilters/MovieFilters.modal';

const Filters = () => {
  return (
    <View>
      <SearchField />
      <MovieFilters />
    </View>
  );
};

export default Filters;
