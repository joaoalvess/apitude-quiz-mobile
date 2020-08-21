import React, { useState, useContext, useEffect } from 'react';
import { AppLoading } from 'expo'
import { Platform, Button } from 'react-native'
import { Container, ImageLogo, Title, Scroll, ViewCenter } from './styles';
import { styles, TextButton } from '../../components/Button/styles';
import { Form, Label, Input } from '../../components/Input/styles';
import Logo from '../../assets/logo.png';

import * as Updates from 'expo-updates'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../Contexts/auth';

const Login: React.FC = () => {
  const [selectCpf, setSelectCpf] = useState<String>('')
  const [selectSenha, setSelectSenha] = useState<String>('')

  const navigation = useNavigation()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if(isAvailable) {
        await Updates.fetchUpdateAsync()

        await Updates.reloadAsync()
      }
    } 

    updateApp()
  },[])

  async function handleNavigateToDashboard() {
    login(selectCpf,selectSenha)
  }

  function handleNavigateToPassRecovery() {
    navigation.navigate('PassRecovery')
  }

  return (
    <Container>
      <Scroll>
        <ViewCenter>
        <ImageLogo resizeMode="contain" source={Logo} />
        </ViewCenter>
        <Title>Questionário Diário de Sintomas</Title>
        <Form enabled={Platform.OS === 'ios'} behavior="padding">
          <ViewCenter>
            <Label>CPF</Label>
            <Input           
              placeholder="seu cpf"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              value={String(selectCpf)}
              onChangeText={(value:String) => setSelectCpf(value)}
            />
            <Label>Senha</Label>
            <Input           
              placeholder="sua senha"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              value={String(selectSenha)}
              onChangeText={(value:String) => setSelectSenha(value)}
            />
          </ViewCenter>
          <Button 
            title="Esqueci minha senha" 
            onPress={handleNavigateToPassRecovery} 
          />
        </Form>
        <ViewCenter>
          <RectButton 
            style={styles.button}
            onPress={handleNavigateToDashboard}
          >
          <TextButton>Entrar</TextButton>
          </RectButton>
        </ViewCenter>
      </Scroll>
    </Container>
  );
}

export default Login;