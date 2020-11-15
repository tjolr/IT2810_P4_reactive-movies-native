import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IThemeObject } from '../../../theme/theme.model';

interface ReviewItemProps {
  author: string;
  text: string;
}

const ReviewItem = ({ author, text }: ReviewItemProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).author}>{author}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    container: {
      backgroundColor: theme.colors.grey3,
      marginTop: 5,
      padding: 8,
      borderRadius: 5,
      borderColor: theme.colors.grey4,
      borderWidth: 2,
    },
    author: {
      fontWeight: 'bold',
    },
  });
export default ReviewItem;
