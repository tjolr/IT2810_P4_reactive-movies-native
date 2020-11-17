import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ICrew } from '../../../GraphQL/models/movie.model';

export interface IListOfPersonsProps {
  title: string;
  persons: ICrew[];
}

const ListOfPersons = (props: IListOfPersonsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {props.title}
        {/* an extra 's' if there are multiple */}
        {props.persons.length > 1 && <Text style={styles.titleText}>s</Text>}
      </Text>
      {props.persons.length > 0 ? (
        <View style={{ flexDirection: 'row' }}>
          {/* Checking index to get correct typing of the list
            e.g. Person1
            e.g. Person1 and Person 2
            e.g. Person1, Person2 and Person3 */}
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
