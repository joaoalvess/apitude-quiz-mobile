import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ImageLogo, Title, Photo, SubTitle, Email, Matricula } from './styles';
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { TextButton, styles } from '../../components/Button/styles'

import Logo from '../../assets/logo.png'
import Image from '../../assets/image.jpeg'

import api from '../../services/api'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

interface Data {
  id: Number,
  nome: String,
  email: String,
  senha: String,
  cpf: Number,
  matricula: Number,
  url: String
}

interface Avatar {
  uri: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  exif?: {
      [key: string]: any;
  };
  base64?: string;
}

declare global {
  interface FormDataValue {
    file: string;
    type?: 'image' | 'video';
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}
const Perfil: React.FC = ({route}:any) => {
  const navigation = useNavigation()

  const [data, setData] = useState<Data>({} as Data)

  const [avatar, setAvatar] = useState<Avatar>({} as Avatar)
  const [vazio, setVazio] = useState(false)

  const { id, nome } = route.params

  async function openImagePickerAsync() {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (permissionResult.granted !== true) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (pickerResult.cancelled) {
      return;
    }

    if (!pickerResult.uri) {
      return;
    }

    setAvatar(pickerResult)
  }

  useEffect(() => {
    console.log(avatar)
  },[avatar])

  async function upload() {
    const file = new FormData()

    file.append('file', {
      file: avatar.uri
    })

    await api.put(`photo/${id}`, {
      body: file,
      headers: {
        'Content-Type': 'multipart/form-data',
      }}).then(() =>{
      console.log('funciono')
    }).catch(() => {
      console.log('errorss')
    })
  }

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

  function handleNavigateToLogin() {
    navigation.navigate('Login')
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
        <ImageLogo resizeMode="contain" source={Logo} />
        { vazio ? <TouchableOpacity 
          onPress={openImagePickerAsync}
        >
          <Photo source={{uri: `${data.url}`}} />
        </TouchableOpacity>: null}
        <Title>{data.nome} </Title>
        <Email>{data.email}</Email>
        <SubTitle>CPF: {data.cpf}</SubTitle>
        <Matricula>Matricula: {data.matricula} </Matricula>
        <RectButton
          style={styles.button}
          onPress={handleNavigateToPassword}
        >
          <TextButton>Alterar senha</TextButton>
        </RectButton>
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