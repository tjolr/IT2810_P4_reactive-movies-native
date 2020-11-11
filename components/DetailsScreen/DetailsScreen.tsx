import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailsScreen = ({route}: any) => {
  return (
    <View style={styles.container}>
      <Text>DetailScreen {route.params.number}!</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
