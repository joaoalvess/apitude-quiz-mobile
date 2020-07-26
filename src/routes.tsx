import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        headerMode="none" 
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5' 
          }
        }}
      >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )}

export default Routes