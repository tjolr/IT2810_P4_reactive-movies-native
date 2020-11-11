import {StatusBar} from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {ThemeContext} from 'react-native-elements';
import Filters from './Filters/Filters';
import MovieList from './MovieList/MovieList';

const DataScreen = ({navigation}: any) => {
  const {theme} = useContext(ThemeContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.title}>
        Movie overview
      </Text>
      <View style={styles.filterContainer}>
        <Filters />
      </View>
      <View style={styles.mainContainer}>
        <MovieList />
      </View>
      <Button
        title="Detailscreen 1"
        onPress={() => navigation.navigate('Detail', {number: '1'})}
      />
      <Button
        title="Detailscreen 2"
        onPress={() => navigation.navigate('Detail', {number: '2'})}
      />
      <View style={styles.bottomContainer}>
        <Text>Bottom</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#323232',
  },
  title: {
    paddingLeft: 10,
    marginTop: 10,
  },
  filterContainer: {
    position: 'relative',
    top: 0,
  },
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  bottomContainer: {position: 'relative', bottom: 0, padding: 10},
});
export default DataScreen;
