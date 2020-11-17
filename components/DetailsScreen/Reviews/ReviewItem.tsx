import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IThemeObject } from '../../../theme/theme.model';

interface IReviewItemProps {
  author: string;
  text: string;
}

/* Review item that shows an review author and review text */
const ReviewItem = ({ author, text }: IReviewItemProps) => {
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
      backgroundColor: theme.colors.grey4,
      marginTop: 6,
      padding: 8,
      borderRadius: 10,
    },
    author: {
      fontWeight: 'bold',
    },
  });
export default ReviewItem;
