import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native'
import { Container, ImageLogo, Title } from './styles';
import { styles, TextButton } from '../../components/Button/styles'
import { Form, Label, Input } from '../../components/Input/styles'
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Login: React.FC = () => {
  const [selectEmail, setSelectEmail] = useState<String>('')
  const [selectSenha, setSelectSenha] = useState<String>('')
  const [user, setUser] = useState([])

  const navigation = useNavigation()

  async function handleNavigateToDashboard() {
    await api.get(`userauth?email=${selectEmail}&senha=${selectSenha}`)
    .then((response) => {
      setUser(response.data)
      navigation.navigate('Dashboard', {
        id: response.data.id,
        nome: response.data.nome
      })
    })
    .catch(() => {
      alert("Email ou senha incorretos")
    })
  }

  return (
    <Container>
      <ImageLogo resizeMode="contain" source={Logo} />
      <Title>Questionario Diario de Sintomas</Title>
      <Form enabled={Platform.OS === 'ios'} behavior="padding">
        <Label>Email</Label>
        <Input           
          placeholder="seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={String(selectEmail)}
          onChangeText={value => setSelectEmail(String(value))}
        />
        <Label>Senha</Label>
        <Input           
          placeholder="sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={String(selectSenha)}
          onChangeText={value => setSelectSenha(String(value))}
        />
      </Form>
      <RectButton 
        style={styles.button}
        onPress={handleNavigateToDashboard}
      >
        <TextButton>Entrar</TextButton>
      </RectButton>
    </Container>
  );
}

export default Login;