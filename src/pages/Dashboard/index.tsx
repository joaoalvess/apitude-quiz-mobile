import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { Container, ImageLogo, Title, Subtitle, PreButton, PosButton } from './styles';
import { TextButton, styles } from '../../components/Button/styles'

import api from '../../services/api'
import routes from '../../routes'

import Logo from '../../assets/logo.png'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

const Dashboard: React.FC = ({route}) => {
  const [data, setData] = useState(' ')
  const [quizToday, setQuizToday] = useState(false)
  const [apiRes, setApiRes] = useState([])
  const [apto, setApto] = useState()

  const [realizou, setRealizou] = useState('')
  const [preButton, setPreButton] = useState('')
  const [buttonText, setButtonText] = useState('')

  const {id,nome} = route.params
  const {finalized, estaApto} = route.params

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();

  useEffect(() => {
    setData(`${date}${month}${year}`)
  },[])

  useEffect(() => {
    if(data != ' ') {
      api.get(`formtoday/${id}?data=${data}`).then(response => {
        setApiRes(response.data)
        setApto(response.data.apto)
      })
    }
  },[data,id,estaApto])

  useEffect(() => {
    if(apiRes == null || apiRes.length == 0){
      setQuizToday(false)
    }
    else{
      setQuizToday(true)
    }
  },[apiRes,finalized])

  useEffect(() => {
    if(finalized == true || quizToday == true) {
      if(estaApto == true || apto == true){
        setPreButton("Você esta apto ao trabalho. Não esqueça de realizar o questionario amanha!")
      }
      if(estaApto == false || apto == false){
        setPreButton("Você não esta apto ao trabalho.")
      }
      setRealizou("Você ja realizou seu questionario de sintomas da covid-19 hoje.")
      setButtonText("Historico")
    }
    else{
      setRealizou("Você ainda não realizou seu questionario de sintomas da covid-19 hoje.")
      setPreButton("Precione o botão abaixo para realiza-lo.")
      setButtonText("Questionario")
    }
  },[finalized,quizToday])

  const navigation = useNavigation()

  async function handleNavigateToQuiz() {
    if(finalized == true || quizToday == true) {
      navigation.navigate('Historico', {
        id: id,
        nome: nome
      })
    }
    else{
      navigation.navigate('Quiz', {
        id: id,
        nome: nome
      })
    }
  }

  function handleNavigateToHistorico() {
    navigation.navigate('Historico', {
      id: id,
      nome: nome
    })
  }

  function handleNavigateToPerfil() {
    navigation.navigate('Perfil', {
      id: id,
      nome: nome
    })
  }

  return (
    <>
      <Container>
        <ImageLogo resizeMode="contain" source={Logo} />
        <Title>Olá, {nome}</Title>
        <Subtitle> {realizou} </Subtitle>
        <PreButton> {preButton} </PreButton>
        <RectButton
          style={styles.button}
          onPress={handleNavigateToQuiz}>
          <TextButton> {buttonText} </TextButton>
        </RectButton>
        <PosButton>Obrigado pela colaboração!</PosButton>
        <PreButton>Tenha um bom dia!</PreButton>
      </Container>
      <ViewMenu>
        <RectButton
          style={Menu.itens}
          onPress={() => {}}
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
          onPress={handleNavigateToPerfil}
        >
          <AntDesign name="user" size={24} color="white" />
          <TextMenu>Perfil</TextMenu>
        </RectButton>
      </ViewMenu>
    </>
  );
}

export default Dashboard;