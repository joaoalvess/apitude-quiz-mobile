import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard'
import Historico from '../pages/Historico'
import Perfil from '../pages/Perfil'
import Clean from '../pages/Clean'
import Password from '../pages/Password'
import Quiz from '../pages/Quiz'
import QuizNextDay from '../pages/QuizNextDay'
import Temperatura from '../pages/Temperatura'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none" 
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5' 
          }
        }}
      >
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="Historico" component={Historico} />
        <AppStack.Screen name="Perfil" component={Perfil} />
        <AppStack.Screen name="Clean" component={Clean} />
        <AppStack.Screen name="Password" component={Password} />
        <AppStack.Screen name="Quiz" component={Quiz} />
        <AppStack.Screen name="QuizNextDay" component={QuizNextDay} />
        <AppStack.Screen name="Temperatura" component={Temperatura} />
      </AppStack.Navigator>
    </NavigationContainer>
  )}

export default AppRoutes