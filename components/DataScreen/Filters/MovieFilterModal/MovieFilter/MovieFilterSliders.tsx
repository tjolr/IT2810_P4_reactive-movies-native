import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeProps } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateRating, updateReleaseYear } from '../../../../../redux/actions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CustomLabel } from './SliderLabel';
import { StyleSheet } from 'react-native';
import { IThemeObject } from '../../../../../theme/theme.model';

export const RatingSlider = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const ratingFilterValuesRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.filter.rating
  );

  // Get initial values from redux store
  const [ratingFilterValue, setRatingFilterValue] = useState<number[]>([
    ratingFilterValuesRedux.from,
    ratingFilterValuesRedux.to,
  ]);

  // cb function for every change in the filter value
  const ratingFilterValueChange = (values: number[]) => {
    setRatingFilterValue(values);
  };

  // cb function for when you lift up finger at a value
  const ratingFilterValueChangeFinished = (values: number[]) => {
    dispatch(updateRating(values));
  };

  return (
    <MultiSlider
      values={[ratingFilterValue[0], ratingFilterValue[1]]}
      sliderLength={220}
      min={0}
      max={10}
      step={0.5}
      snapped
      enableLabel={true}
      allowOverlap={true}
      onValuesChange={ratingFilterValueChange}
      onValuesChangeFinish={ratingFilterValueChangeFinished}
      customLabel={CustomLabel}
      selectedStyle={styles(theme).sliderSelected}
      unselectedStyle={styles(theme).sliderUnselected}
      containerStyle={styles(theme).sliderContainer}
      markerStyle={styles(theme).sliderMarker}
    />
  );
};

export const ReleaseYearSlider = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);
  const dispatch = useDispatch();

  const releaseYearFilterValuesRedux = useSelector(
    (state: RootStateOrAny) => state.movieReducer.filter.release_year
  );

  // Get initial values from redux store
  const [releaseYearFilterValue, setReleaseYearFilterValue] = useState<
    number[]
  >([releaseYearFilterValuesRedux.from, releaseYearFilterValuesRedux.to]);

  // cb function for every change in the filter value
  const releaseYearFilterValueChange = (values: number[]) => {
    setReleaseYearFilterValue(values);
  };

  // cb function for when you lift up finger at a value
  const releaseYearFilterValueChangeFinished = (values: number[]) => {
    dispatch(updateReleaseYear(values));
  };

  return (
    <MultiSlider
      values={[releaseYearFilterValue[0], releaseYearFilterValue[1]]}
      sliderLength={220}
      min={1916}
      max={2020}
      step={1}
      enableLabel={true}
      allowOverlap={true}
      onValuesChange={releaseYearFilterValueChange}
      onValuesChangeFinish={releaseYearFilterValueChangeFinished}
      customLabel={CustomLabel}
      selectedStyle={styles(theme).sliderSelected}
      unselectedStyle={styles(theme).sliderUnselected}
      containerStyle={styles(theme).sliderContainer}
      markerStyle={styles(theme).sliderMarker}
    />
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    sliderSelected: {
      backgroundColor: theme.colors.grey5,
    },
    sliderUnselected: {
      backgroundColor: theme.colors.grey0,
    },
    sliderContainer: {
      flex: 1,
      alignSelf: 'center',
    },
    sliderMarker: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 0,
    },
  });
