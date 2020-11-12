import React, { useState, useContext } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, ThemeContext, ThemeProps } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { IThemeObject } from '../../../../theme/theme.model';
import { RatingSlider, ReleaseYearSlider } from './MovieFilterSliders';

const MovieFilters = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const toggleModal = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles(theme).buttonsViewContainer}>
      <Button
        title="Filters"
        onPress={toggleModal}
        icon={<Icon name="sort" />}
        iconRight={true}
        containerStyle={{ flex: 2.8, marginRight: 10 }}
      />
      <Button
        title="Clear"
        onPress={toggleModal}
        type="outline"
        icon={
          <Icon
            name="clear"
            color={isFilterActive ? theme.colors.primary : theme.colors.grey3}
          />
        }
        iconRight={true}
        containerStyle={{ flex: 1 }}
        disabled={!isFilterActive}
        disabledStyle={{ backgroundColor: theme.colors.grey4 }}
        titleStyle={{ padding: 2 }}
      />

      <Modal
        style={{ margin: 0 }}
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        onSwipeComplete={() => setShowFilters(false)}
        swipeDirection="down"
      >
        <View style={styles(theme).modalContainer}>
          <Text style={{ color: 'white' }} h4>
            Filter movies
          </Text>
          <ScrollView>
            <Text style={styles(theme).sliderHeaderText}>Rating</Text>
            <RatingSlider />
            <Text style={styles(theme).sliderHeaderText}>Release year</Text>
            <ReleaseYearSlider />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = (theme: IThemeObject) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: theme.colors.grey3,
      padding: 15,
      height: 300,
      position: 'absolute',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      bottom: 0,
      left: 0,
      right: 0,
    },
    filterBtn: {
      width: '40%',
    },
    buttonsViewContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      margin: 0,
    },
    sliderHeaderText: {
      alignSelf: 'center',
      bottom: -10,
    },
  });

export default MovieFilters;
