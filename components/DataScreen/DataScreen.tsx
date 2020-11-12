import {StatusBar} from 'expo-status-bar';
import React, {useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Button, Text, ThemeProps} from 'react-native-elements';
import {ThemeContext} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import {IThemeObject} from '../../theme/theme.model';
import Filters from './Filters/Filters';
import MovieList from './MovieList/MovieList';

const DataScreen = ({navigation}: any) => {
  const {theme} = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).filterContainer}>
        <Filters />
      </View>
      <View style={styles(theme).movieListContainer}>
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
      <View style={styles(theme).bottomContainer}>
        <Text>Bottom</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = (theme: IThemeObject) =>
  EStyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.colors.grey0,
    },
    title: {
      paddingLeft: 10,
      marginTop: 10,
    },
    filterContainer: {
      position: 'relative',
      paddingTop: 3,
      top: 0,
    },
    movieListContainer: {
      flex: 1,
      padding: 0,
    },
    bottomContainer: {position: 'relative', bottom: 0, padding: 10},
  });
export default DataScreen;
