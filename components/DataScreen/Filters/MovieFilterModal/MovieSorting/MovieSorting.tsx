import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  defaultSortDirection,
  ISort,
  SortDirection,
  sortDirectionList,
  sortDirectionListLength,
} from '../../../../../redux/models/movieReducer.model';
import { IThemeObject } from '../../../../../theme/theme.model';
import { sortByFields } from './MovieSorting.service';
import { SortButton } from './SortButton';

const MovieSorting = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>SORT BY</Text>
      <View style={styles(theme).innerContainer}>
        {sortByFields.map((field, index) => (
          <SortButton field={field} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    container: {
      marginTop: 13,
      borderRadius: 6,
    },
    title: {
      marginBottom: 5,
    },
    innerContainer: {
      marginTop: 2,
      flexDirection: 'row',
    },
  });

export default MovieSorting;
