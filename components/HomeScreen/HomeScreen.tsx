import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen!</Text>

      <Button
        title="Go to moviescreen"
        onPress={() => navigation.navigate('Movies')}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
