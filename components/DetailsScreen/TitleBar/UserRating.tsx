import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, ThemeContext, ThemeProps } from 'react-native-elements';
import { IThemeObject } from '../../../theme/theme.model';

export interface IUserRatingProps {
  vote_average: number;
  vote_count: number;
}

const UserRating = (props: IUserRatingProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Icon name="star" color={theme.colors.secondary} size={35} />
      <Text style={{ fontSize: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>{props.vote_average}</Text>
        /10
      </Text>
      <Text style={{ fontSize: 10 }}>({props.vote_count})</Text>
    </View>
  );
};

export default UserRating;

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    container: {
      padding: 10,
      alignItems: 'center',
    },
  });
