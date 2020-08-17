import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login'
import PassRecovery from './pages/PassRecovery'
import Dashboard from './pages/Dashboard'
import Historico from './pages/Historico'
import Perfil from './pages/Perfil'
import Clean from './pages/Clean'
import Password from './pages/Password'
import Quiz from './pages/Quiz'
import QuizNextDay from './pages/QuizNextDay'
import Temperatura from './pages/Temperatura'

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
        <Stack.Screen name="PassRecovery" component={PassRecovery} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Clean" component={Clean} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="QuizNextDay" component={QuizNextDay} />
        <Stack.Screen name="Temperatura" component={Temperatura} />
      </Stack.Navigator>
    </NavigationContainer>
  )}

export default Routes