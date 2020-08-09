import React from 'react';
import { Dimensions } from 'react-native';
import { Container, Image, Scroll, ImageLogo, Title, SubTitle } from './styles';
import Logo from '../../assets/logo.png'

import { TextButton, styles } from '../../components/Button/styles'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
 
const Clean: React.FC = ({route}:any) => {
  const navigation = useNavigation()

  const { id, nome, senha } = route.params

  const images = [
    'https://i.imgur.com/4TjFavr.jpg',
    'https://i.imgur.com/2SETpmy.jpg',
    'https://i.imgur.com/bJxxrgZ.jpg',
    'https://i.imgur.com/rUcLz5C.jpg',
    'https://i.imgur.com/kbTWnCp.jpg',
    'https://i.imgur.com/v86sTKI.jpg',
    'https://i.imgur.com/T1STm3A.jpg',
    'https://i.imgur.com/TJfsBt7.jpg',
    'https://i.imgur.com/188HiV0.jpg',
    'https://i.imgur.com/8MjHUkT.jpg',
    'https://i.imgur.com/uj5zMx5.jpg'
  ]

  const {width} = Dimensions.get("window")

  function handleNavigateToPassword() {
    alert("Sua Senha é igual a sua matricula por favor altere sua senha!")
    navigation.navigate('Password', {
      id: id,
      nome: nome,
      senha: senha
    })
  }

  return (
    <Container>
      <ImageLogo resizeMode="contain" source={Logo} />
      <Title>Higienização e Detetização</Title>
      <SubTitle>Para segurança dos nossos colaboradores todos os ambientes foram higienizados!</SubTitle>
      <Scroll
        pagingEnabled 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{width}}
      >
        {images.map((image, i) => (
          <Image 
            key={i}
            source={{uri: image}}
            style={{width, resizeMode:'contain'}}
          />
        ))}
      </Scroll>
      <RectButton
        style={styles.button}
        onPress={handleNavigateToPassword}>
        <TextButton> Continuar </TextButton>
      </RectButton>
    </Container>
  );
}

export default Clean;