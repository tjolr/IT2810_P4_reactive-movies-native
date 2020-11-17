import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { sortByFields } from './MovieSorting.service';
import { SortButton } from './SortButton';

const MovieSorting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SORT BY</Text>
      <View style={styles.innerContainer}>
        {sortByFields.map((field, index) => (
          <SortButton field={field} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
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
