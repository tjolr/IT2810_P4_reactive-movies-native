import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ICrew } from '../../../GraphQL/models/movie.model';

export interface IListOfPersonsProps {
  title: string;
  persons: ICrew[];
}

const ListOfPersons = (props: IListOfPersonsProps) => {
  // component for showing a list of people with correct typing
  // ex1: Person1
  // ex2: Person1 and Person 2
  // ex3: Person1, Person2 and Person3
  // with a title that shows an extra s if there are multiple persons
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {props.title}
        {props.persons.length > 1 && <Text style={styles.titleText}>s</Text>}
      </Text>
      {props.persons.length > 0 ? (
        <View style={{ flexDirection: 'row' }}>
          {props.persons.map((person: ICrew, index: number) =>
            index == 0 ? (
              <Text key={index}>{person.name}</Text>
            ) : index == props.persons.length - 1 ? (
              <Text key={index}> and {person.name}</Text>
            ) : (
              <Text key={index}>, {person.name}</Text>
            )
          )}
        </View>
      ) : (
        <Text>Unknown</Text>
      )}
    </View>
  );
};

export default ListOfPersons;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
