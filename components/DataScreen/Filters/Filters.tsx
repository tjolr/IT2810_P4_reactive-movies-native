import React from 'react';
import { View } from 'react-native';
import MovieFilters from './MovieFilterModal/MovieFilters.modal';
import SearchField from './SearchField/SearchField';

const Filters = () => {
  return (
    <View>
      <SearchField />
      <MovieFilters />
    </View>
  );
};

export default Filters;
