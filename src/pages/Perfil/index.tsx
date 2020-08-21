import React, { useState, useEffect, useContext } from 'react';
import { Container, ImageLogo, Title, SubTitle, Email, Matricula, ViewCenter, Scroll } from './styles';
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { TextButton, styles } from '../../components/Button/styles'
import Logo from '../../assets/logo.png'

import api from '../../services/api'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import AuthContext from '../../Contexts/auth';

interface Data {
  id: Number,
  nome: String,
  email: String,
  senha: String,
  cpf: Number,
  matricula: Number,
  url: String
}

const Perfil: React.FC = ({route}:any) => {
  const navigation = useNavigation()

  const [data, setData] = useState<Data>({} as Data)

  const { id, nome } = route.params

  const { logout } = useContext(AuthContext)

  useEffect(() => {
    api.get(`perfil/${id}`).then((response:any) => {
      setData(response.data)
    })
  }, [id])

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  function handleNavigateToHistorico() {
    navigation.navigate('Historico', {
      id: id,
      nome: nome
    })
  }

  function handleNavigateToPassword() {
    navigation.navigate('Password', {
      id: id,
      senha: data.senha
    })
  }

  return (
    <>
      <Container>
        <Scroll>
        <ViewCenter>
        <ImageLogo resizeMode="contain" source={Logo} />
        </ViewCenter>
        <Title>{data.nome} </Title>
        <Email>{data.email}</Email>
        <SubTitle>CPF: {data.cpf}</SubTitle>
        <Matricula>Matricula: {data.matricula} </Matricula>
        <ViewCenter>
        <RectButton
          style={styles.button}
          onPress={handleNavigateToPassword}
        >
          <TextButton>Alterar senha</TextButton>
        </RectButton>
        <RectButton
          style={styles.button}
          onPress={logout}
        >
          <TextButton>Sair</TextButton>
        </RectButton>
        </ViewCenter>
        </Scroll>
      </Container>
      <ViewMenu>
      <RectButton
          style={Menu.itens}
          onPress={handleNavigateToDashboard}
        >
          <AntDesign name="home" size={24} color="white" />
          <TextMenu>Início</TextMenu>
        </RectButton>
        <RectButton
          style={Menu.itens}
          onPress={handleNavigateToHistorico}
        >
          <AntDesign name="clockcircleo" size={24} color="white" />
          <TextMenu>Histórico</TextMenu>
        </RectButton>
        <RectButton
          style={Menu.itens}
          onPress={() => {}}
        >
          <AntDesign name="user" size={24} color="white" />
          <TextMenu>Perfil</TextMenu>
        </RectButton>
      </ViewMenu>
    </>
  );
}

export default Perfil;