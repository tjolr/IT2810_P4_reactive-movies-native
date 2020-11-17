import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { minutesToHourString } from '../../../utils/columnFormatting';
import { getFullYearNumber } from '../../../utils/dates';
import UserRating, { IUserRatingProps } from './UserRating';

export interface ITitleBarProps {
  title: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  runtime: number;
}

const TitleBar = (props: ITitleBarProps) => {
  // Creating prop objects for sending data to child component
  const UserRatingProp: IUserRatingProps = {
    vote_average: props.vote_average,
    vote_count: props.vote_count,
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        {/* If the title is long, use smaller text size */}
        {props.title.length < 13 ? (
          <Text h1>{props.title}</Text>
        ) : props.title.length < 16 ? (
          <Text h2>{props.title}</Text>
        ) : props.title.length < 40 ? (
          <Text h3>{props.title}</Text>
        ) : (
          <Text h4>{props.title}</Text>
        )}
        <Text>
          {getFullYearNumber(props.release_date)}
          {/* Unicode dot */}
          {'  \u2022  '}
          {minutesToHourString(props.runtime)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <UserRating {...UserRatingProp} />
      </View>
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
