import React from 'react';
import Routes from './src/routes'
import { StatusBar } from 'react-native'
import { AppLoading } from 'expo'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { AuthProvider } from './src/Contexts/auth';

export default function App() {
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C4FA1" />
      <Routes />
    </AuthProvider>
  )
}