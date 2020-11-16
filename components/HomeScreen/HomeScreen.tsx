import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=881&q=80',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.innerContainer}>
          <View style={{ alignItems: 'center' }}>
            <Text h1>Movie database</Text>
            <Text> - Your favorite movie is just a search away!</Text>
          </View>
          <Button
            title="Browse movies"
            onPress={() => navigation.navigate('Movies')}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
        </View>
        <StatusBar style="light" animated={true} />
      </ImageBackground>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 30,
  },
  buttonStyle: {
    padding: 18,
    backgroundColor: '#323232d8',
  },
  buttonContainerStyle: {
    borderRadius: 10,
  },
});
export default HomeScreen;
