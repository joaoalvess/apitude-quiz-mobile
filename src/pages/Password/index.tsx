import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native'
import { Container, Title, ImageLogo, Form } from './styles';
import { TextButton, styles } from '../../components/Button/styles'
import { returnButton } from '../../components/ReturnButton/styles'
import { Input, Label } from '../../components/Input/styles'
import Logo from '../../assets/logo.png'
import { AntDesign as ReturnIcon } from '@expo/vector-icons'

import api from '../../services/api'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

const Password: React.FC = ({route}:any) => {
  const navigation = useNavigation()
  
  const [oldSenha, setOldSenha] = useState<String>('')
  const [newSenha, setNewSenha] = useState<String>('')
  const [confirmNewSenha, setConfirmNewSenha] = useState<String>('')

  const {id, senha} = route.params

  async function handleSubmit() {
    if(newSenha == confirmNewSenha) {
      if(oldSenha == senha){
        const senha = newSenha

        const formdata = {
          senha
        }

        await api.put(`perfil/${id}`, formdata).then(() => {
          alert('Senha alterada!')
          navigation.navigate('Perfil', {
            id: id
          })
        }).catch(() => {
          alert('Algo deu errado tente novamente!')
        })
      }
      else{
        return alert('Senha antiga incorreta!')
      }
    }
    else {
      return alert('Confirmação de senha incorreta!')
    }
  }

  function handleNavigateBack() {
    navigation.navigate('Perfil', {
      id: id,
    })
  }

  return (
    <Container>
      <View style={returnButton.ReturnButton}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <ReturnIcon name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ImageLogo resizeMode="contain" source={Logo} />
      <Title>Trocar sua senha</Title>
      <Form>
        <Label>Sua senha antiga</Label>
        <Input 
          placeholder="sua senha antiga"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={String(oldSenha)}
          onChangeText={(value:String) => setOldSenha(value)}
        />
        <Label>Sua nova senha</Label>
        <Input 
          placeholder="sua nova senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={String(newSenha)}
          onChangeText={(value:String) => setNewSenha(value)}
        />
        <Label>Confirme sua nova senha</Label>
        <Input 
          placeholder="confirme sua nova senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={String(confirmNewSenha)}
          onChangeText={(value:String) => setConfirmNewSenha(value)}
        />
      </Form>
      <RectButton
        style={styles.button}
        onPress={handleSubmit}
      >
        <TextButton>Alterar</TextButton>
      </RectButton>
    </Container>
  );
}

export default Password;