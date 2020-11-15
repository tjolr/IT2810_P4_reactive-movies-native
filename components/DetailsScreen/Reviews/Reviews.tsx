import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Icon, Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MOVIE_REVIEW_QUERY } from '../../../GraphQL/QueryBuilder';
import { IThemeObject } from '../../../theme/theme.model';
import { LoadingAnimationSwing } from '../../Generic/loading';
import ReviewItem from './ReviewItem';

const Reviews = (props: any) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  const { loading, error, data } = useQuery(MOVIE_REVIEW_QUERY, {
    variables: {
      movieId: props.movieId,
    },
  });

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text h4>REVIEWS</Text>
        {!loading && (
          <View
            style={[
              styles(theme).reviewCount,
              {
                backgroundColor:
                  data && data.Reviews.length > 0
                    ? theme.colors.primary
                    : theme.colors.secondary,
              },
            ]}
          >
            <Text>{data && data.Reviews.length}</Text>
          </View>
        )}
      </View>

      <View style={styles(theme).contentContainer}>
        {loading ? (
          <View style={styles(theme).loadingContainer}>
            <LoadingAnimationSwing />
          </View>
        ) : error ? (
          <View
            style={[
              styles(theme).userFeedbackContainer,
              { backgroundColor: 'darkred' },
            ]}
          >
            <Icon name="mood-bad" containerStyle={{ margin: 5 }} />
            <Text h4> Error while loading reviews</Text>
          </View>
        ) : data !== undefined && data.Reviews.length > 0 ? (
          data.Reviews.filter(
            (review: any) => review.text && review.author
          ).map((review: any, index: number) => (
            <ReviewItem key={index} author={review.author} text={review.text} />
          ))
        ) : (
          <View
            style={[
              styles(theme).userFeedbackContainer,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <Icon name="mood-bad" containerStyle={{ margin: 5 }} />
            <Text h4> No reviews for this movie.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    container: {
      backgroundColor: theme.colors.grey2,
      padding: 10,
      paddingBottom: 15,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewCount: {
      width: 25,
      height: 25,

      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    userFeedbackContainer: {
      margin: 15,
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    contentContainer: {
      minHeight: 70,
      justifyContent: 'center',
    },
  });

export default Reviews;
