import React from 'react';
import { View } from 'react-native';
import { Container, ImageLogo } from './styles';
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { TextButton, styles } from '../../components/Button/styles'
import Logo from '../../assets/logo.png'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

const Perfil: React.FC = ({route}) => {
  const navigation = useNavigation()

  const {id,nome} = route.params

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  function handleNavigateToHistorico() {
    navigation.navigate('Historico', {
      id: id,
      nome: nome
    })
  }

  function handleNavigateToLogin() {
    navigation.navigate('Login')
  }

  return (
    <>
      <Container>
        <ImageLogo resizeMode="contain" source={Logo} />
        <RectButton
          style={styles.button}
          onPress={handleNavigateToLogin}
        >
          <TextButton>Sair</TextButton>
        </RectButton>
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