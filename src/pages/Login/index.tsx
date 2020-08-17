import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo'
import { Platform } from 'react-native'
import { Container, ImageLogo, Title, PassRecover, ViewCenter, ViewLeft, Scroll } from './styles';
import { styles, TextButton } from '../../components/Button/styles'
import { Form, Label, Input } from '../../components/Input/styles'
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import * as Updates from 'expo-updates';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Login: React.FC = () => {
  const [selectCpf, setSelectCpf] = useState<String>('')
  const [selectSenha, setSelectSenha] = useState<String>('')
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState<Boolean>(true)

  const navigation = useNavigation()

  useEffect(() => {
    async function updateApp() {
      const {isAvailable} = await Updates.checkForUpdateAsync()

      if(isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }

    updateApp()
  },[])

  async function handleNavigateToDashboard() {
    setLoading(false)
    await api.get(`userauth?cpf=${selectCpf}&senha=${selectSenha}`)
    .then((response:any) => {
      setLoading(true)
      if(response.data.senha == response.data.matricula){
        navigation.navigate('Clean', {
          id: response.data.id,
          nome: response.data.nome,
          senha: response.data.senha
        })
      }
      else {
        navigation.navigate('Dashboard', {
          id: response.data.id,
          nome: response.data.nome,
        })
      }
    })
    .catch((response:any) => {
      setLoading(true)
      console.log(response)
      alert("Email ou senha incorretos")
    })
  }

  if(!loading) {
    return <AppLoading />
  }

  function recovery() {
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
        <ViewLeft>
          <PassRecover 
            title={"Esqueci minha senha"}
            onPress={recovery} 
          />
        </ViewLeft>
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