import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Icon, Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { MOVIE_REVIEW_QUERY } from '../../../GraphQL/QueryBuilder';
import { setReviewHasPendingChanges } from '../../../redux/actions';
import { IThemeObject } from '../../../theme/theme.model';
import { LoadingAnimationSwing } from '../../Generic/loading';
import ReviewFormModal from './ReviewForm.modal';
import ReviewItem from './ReviewItem';

interface ReviewsProps {
  movieId: string;
}

const Reviews = ({ movieId }: ReviewsProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const hasPendingChangesRedux = useSelector(
    (state: RootStateOrAny) => state.reviewReducer.hasPendingChanges
  );

  const { loading, error, data, refetch } = useQuery(MOVIE_REVIEW_QUERY, {
    variables: {
      movieId: movieId,
    },
  });

  useEffect(() => {
    hasPendingChangesRedux &&
      dispatch(setReviewHasPendingChanges(false)) &&
      refetch();
  }, [hasPendingChangesRedux]);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <View style={styles(theme).reviewTitleAndNumberContainer}>
          <Text h3>REVIEWS</Text>
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

        <ReviewFormModal movieId={movieId} />
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
          data.Reviews.filter((review: any) => review.text && review.author)
            /* Reverses the list to show newest review on top */
            .slice(0)
            .reverse()
            .map((review: any, index: number) => (
              <ReviewItem
                key={index}
                author={review.author}
                text={review.text}
              />
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
      paddingTop: 8,
      paddingBottom: 8,
    },
    reviewCount: {
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      marginLeft: 6,
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
    reviewTitleAndNumberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default Reviews;
