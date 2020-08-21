import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login'
import PassRecovery from '../pages/PassRecovery'
import CodeConfirm from '../pages/CodeConfirm'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
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
      <AuthStack.Screen name="CodeConfirm" component={CodeConfirm} />
    </AuthStack.Navigator>
  )}

export default AuthRoutes