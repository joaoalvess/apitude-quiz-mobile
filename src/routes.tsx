import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './Contexts/auth';

import AuthRoutes from './Routes/auth.routes'
import AppRoutes from './Routes/app.routes'
 
const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext)

  return (
    <NavigationContainer>
      { signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )}

export default Routes