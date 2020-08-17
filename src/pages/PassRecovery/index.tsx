import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo'
import { Platform } from 'react-native'
import { Container, ImageLogo, Title, Scroll, ViewCenter } from './styles';
import { styles, TextButton } from '../../components/Button/styles'
import { Form, Label, Input } from '../../components/Input/styles'
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import * as Updates from 'expo-updates';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const PassRecovery: React.FC = () => {
  const [selectCpf, setSelectCpf] = useState<String>('')
  const [selectEmail, setSelectEmail] = useState<String>('')
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState<Boolean>(true)

  const navigation = useNavigation()

  async function handleResetPass() {
    const email = selectEmail
    const cpf = selectCpf

    const formData = {
      cpf,
      email
    }

    setLoading(false)
    await api.get('send', formData, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response:any) => {
      setLoading(true)
      console.log(response.data)
    })
    .catch((response:any) => {
      setLoading(true)
      alert("Usuario não encontrado")
      console.log(response)
    })
  }

  if(!loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Scroll>
        <ViewCenter>
          <ImageLogo resizeMode="contain" source={Logo} />
        </ViewCenter>
      <Title>Recuperação de Senha</Title>
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
        <Label>Email</Label>
        <Input           
          placeholder="seu email"
          autoCapitalize="none"
          autoCorrect={false}
          value={String(selectEmail)}
          onChangeText={(value:String) => setSelectEmail(value)}
        />
      </Form>
      <RectButton 
        style={styles.button}
        onPress={handleResetPass}
      >
        <TextButton>Enviar</TextButton>
      </RectButton>
      </Scroll>
    </Container>
  );
}

export default PassRecovery;