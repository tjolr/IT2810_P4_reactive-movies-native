import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import DataScreen from './components/DataScreen/DataScreen';
import {ThemeProvider, colors, Button} from 'react-native-elements';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

const theme = {
  Button: {
    containerStyle: {
      margin: 10,
    },
    titleStyle: {
      padding: 15,
    },
  },
  colors: {
    secondary: '#ffb732',
    grey0: '#1b262c',
    grey1: '#313b41',
    grey2: '#485156',
    grey3: '#8d9295',
    grey4: '#babdbf',
    grey5: '#d1d3d4',
  },
};

const App = () => {
  StatusBar.setBarStyle('dark-content', true);
  return (
    <ThemeProvider theme={theme} useDark={true}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Profile" component={DataScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
