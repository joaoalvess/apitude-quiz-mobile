import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login'
import PassRecovery from '../pages/PassRecovery'
import Dashboard from '../pages/Dashboard'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator 
        headerMode="none" 
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5' 
          }
        }}
      >
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="PassRecovery" component={PassRecovery} />
        <AuthStack.Screen name="Dashboard" component={Dashboard} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )}

export default AuthRoutes