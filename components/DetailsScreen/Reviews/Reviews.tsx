import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, ThemeContext, ThemeProps } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { MOVIE_REVIEW_QUERY } from '../../../GraphQL/QueryBuilder';
import { setReviewHasPendingChanges } from '../../../redux/actions';
import { IThemeObject } from '../../../theme/theme.model';
import Userfeedback from '../../Generic/Userfeedback';
import ReviewFormModal from './ReviewForm.modal';
import ReviewItem from './ReviewItem';
import Fade from 'react-native-fade';
import { IReviewListObject } from '../../../GraphQL/models/review.model';

interface ReviewsProps {
  movieId: string;
}

/* Component that is parent of all the reviews */
const Reviews = ({ movieId }: ReviewsProps) => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const hasPendingChangesRedux = useSelector(
    (state: RootStateOrAny) => state.reviewReducer.hasPendingChanges
  );

  /* Query all reviews that is submitted to this movie 
  refetch method to do one more refetch when needed */
  const { loading, error, data, refetch } = useQuery(MOVIE_REVIEW_QUERY, {
    variables: {
      movieId: movieId,
    },
  });

  // Hook for refetching reviews when new reviews are added.
  useEffect(() => {
    hasPendingChangesRedux &&
      dispatch(setReviewHasPendingChanges(false)) &&
      refetch();
  }, [hasPendingChangesRedux]);

  return (
    <View style={styles(theme).container}>
      <Fade
        visible={!loading && data !== undefined}
        direction="down"
        duration={1000}
      >
        <View style={styles(theme).header}>
          <View style={styles(theme).reviewTitleAndNumberContainer}>
            <Text h3>Reviews</Text>
            {/* Shows the number of reviews, with backgroundcolor dependent on
            how many reviews there is for current movie */}
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
          </View>

          <ReviewFormModal movieId={movieId} />
        </View>

        <View style={styles(theme).contentContainer}>
          {loading ? null : error ? (
            <Userfeedback message="Error while loading reviews" type="error" />
          ) : data !== undefined && data.Reviews.length === 0 ? (
            <Userfeedback message="No reviews for this movie" type="warning" />
          ) : (
            data.Reviews.filter(
              (review: IReviewListObject) => review.text && review.author
            )
              /* Reverses the list to show newest review on top */
              .slice(0)
              .reverse()
              .map((review: IReviewListObject, index: number) => (
                <ReviewItem
                  key={index}
                  author={review.author}
                  text={review.text}
                />
              ))
          )}
        </View>
      </Fade>
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
      minHeight: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 3,
      paddingBottom: 3,
    },
    reviewCount: {
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginLeft: 6,
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
