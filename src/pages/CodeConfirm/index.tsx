import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo'
import { Platform } from 'react-native'
import { Container, ImageLogo, Title, Scroll, ViewCenter, TextRecovery } from './styles';
import { styles, TextButton } from '../../components/Button/styles'
import { Form, Label, Input } from '../../components/Input/styles'
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import * as Updates from 'expo-updates';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const CodeConfirm: React.FC = ({route}:any) => {
  const [selectCode, setSelectCode] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(true)

  const navigation = useNavigation()

  const { code, matricula, id } = route.params

  async function handleCofirmCode() {
    const senha = matricula

    const formData = {
      senha
    }

    if(selectCode == code) {
      api.put(`perfil/${id}`, formData).then(() => {
        alert('Use sua Matricula para Logar!')
        navigation.navigate('Login')
      }).catch(() => {
        alert('erro tente novamente!')
      })
    }
    if(selectCode != code) {
      alert('Código incorreto!')
    }
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
      <TextRecovery>Um código de verificação foi enviado para o seu email por favor verifique sua caixa de entrada e insira o código!</TextRecovery>
      <Form enabled={Platform.OS === 'ios'} behavior="padding">
        <ViewCenter>
          <Label>Código de Verificação</Label>
          <Input           
            placeholder="seu código de verificação"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={String(selectCode)}
            onChangeText={(value:String) => setSelectCode(value)}
          />
        </ViewCenter>
        <TextRecovery>Sua senha sera redefinida para sua matricula!</TextRecovery>
      </Form>
      <ViewCenter>
        <RectButton 
          style={styles.button}
          onPress={handleCofirmCode}
        >
          <TextButton>Resetar Senha</TextButton>
        </RectButton>
      </ViewCenter>
      </Scroll>
    </Container>
  );
}

export default CodeConfirm;