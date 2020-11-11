import React, {useState, useContext} from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet} from 'react-native';
import {Button, Text, ThemeContext} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const MovieFilters = () => {
  const {theme} = useContext<any>(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const toggleModal = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.buttonsViewContainer}>
      <Button
        title="Filters"
        onPress={toggleModal}
        icon={<Icon name="sort" />}
        iconRight={true}
        containerStyle={{flex: 2.8}}
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
        containerStyle={{flex: 1}}
        disabled={!isFilterActive}
        disabledStyle={{backgroundColor: theme.colors.grey4}}
        titleStyle={{padding: 2}}
      />

      <Modal
        style={{margin: 0}}
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        onSwipeComplete={() => setShowFilters(false)}
        swipeDirection="down"
      >
        <View style={styles.modalContainer}>
          <Text style={{color: 'white'}} h4>
            Movie filters
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#323232',
    padding: 15,
    height: 400,
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
    padding: 0,
    margin: 0,
  },
});

export default MovieFilters;
