import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import DataScreen from './components/DataScreen/DataScreen';
import { ThemeProvider } from 'react-native-elements';
import DetailsScreen from './components/DetailsScreen/DetailsScreen';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './GraphQL/ApolloClient';
import { theme } from './theme/theme.model';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'expo-status-bar';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
});
const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme} useDark={true}>
          <StatusBar style="dark" animated={true} />

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Movies"
                component={DataScreen}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.grey3,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.grey3,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
