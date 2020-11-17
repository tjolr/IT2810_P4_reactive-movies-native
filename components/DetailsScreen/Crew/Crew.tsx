import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ICrew } from '../../../GraphQL/models/movie.model';
import ListOfPersons from './ListOfPersons';

export interface ICrewProps {
  crew: ICrew[];
}

const Crew = (props: ICrewProps) => {
  let directors: ICrew[] = [];
  let writers: ICrew[] = [];

  // go through the crew, and add the writers and the directors to their lists
  if (props.crew) {
    props.crew.map((crewMember: ICrew) => {
      if (crewMember.job) {
        if (crewMember.job.toLowerCase() === 'director') {
          directors.push(crewMember);
        }
        if (crewMember.job.toLowerCase() === 'writer') {
          writers.push(crewMember);
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <ListOfPersons persons={directors} title="Director" />
      <ListOfPersons persons={writers} title="Writer" />
    </View>
  );
};

export default Crew;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
