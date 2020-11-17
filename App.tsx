import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './GraphQL/ApolloClient';
import { theme } from './theme/theme.model';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './components/Navigation/RootNavigation';

// Needs to trigger this to use the ExtendedStylesheet
EStyleSheet.build({});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme} useDark={true}>
          <StatusBar style="dark" animated={true} />
          <RootNavigation />
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
