import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import SearchField from './Filters/SearchField';
import {ThemeContext} from 'react-native-elements';

const DataScreen = (props: any) => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.title}>
        Movie overview
      </Text>
      <View style={styles.filterContainer}>
        <SearchField />
      </View>
      <View style={styles.mainContainer}>
        <Text>Middle</Text>
      </View>
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
