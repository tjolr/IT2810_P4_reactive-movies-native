import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import { IThemeObject } from '../../../theme/theme.model';

interface IGenreTagProps {
  name: string;
}

const GenreTag = (props: IGenreTagProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Text style={{ fontSize: 12 }}>{props.name}</Text>
    </View>
  );
};

export default GenreTag;

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    container: {
      padding: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.grey4,
    },
  });
