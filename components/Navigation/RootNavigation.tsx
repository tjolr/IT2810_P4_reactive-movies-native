import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { ThemeProps, ThemeContext } from 'react-native-elements';
import DataScreen from '../DataScreen/DataScreen';
import DetailsScreen from '../DetailsScreen/DetailsScreen';
import HomeScreen from '../HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const { theme } = useContext<ThemeProps<any>>(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.grey0,
              borderBottomWidth: 0,
              borderBottomColor: 'red',
            },
            headerTintColor: '#fff',

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
  );
};

export default RootNavigation;
