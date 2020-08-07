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

const Dashboard: React.FC = ({route}:any) => {
  const [data, setData] = useState('')
  const [userDate, setUserDate] = useState('')
  const [quizToday, setQuizToday] = useState(false)
  const [apiRes, setApiRes] = useState([])
  const [apto, setApto] = useState()
  const [formId, setFormId] = useState()

  const [temp, setTemp] = useState<number>()
  const [nextDay, setNextDay] = useState('')
  const [apiNextDay, setApiNextDay] = useState([])
  const [quizNextDay, setQuizNextDay] = useState(false)

  const [realizou, setRealizou] = useState('')
  const [preButton, setPreButton] = useState('')
  const [buttonText, setButtonText] = useState('')
  
  const {id,nome} = route.params
  const {finalized, estaApto} = route.params
  const { addTemp } = route.params
  const { nextFinalized } = route.params

  var hours = new Date().getHours();
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  function diasNoMesSearch(mes: any, ano:any) {
    let data = new Date(ano, mes, 0);
    return data.getDate();
  }

  let mesAtual = new Date().getMonth()+1;
  let anoAtual = new Date().getFullYear();
  let diasNoMes = diasNoMesSearch(mesAtual, anoAtual);
  let diaAtual = new Date().getDate();
  if (diaAtual === diasNoMes){  
    diaAtual = 1;
  }else{
    diaAtual += +1;
  }

  useEffect(() => {
    setData(`${date}${month}${year}`)
    setUserDate(`${date}/${month}/${year}`)
    setNextDay(`${diaAtual}${mesAtual}${anoAtual}`)
  },[date])

  useEffect(() => {
    if(data != '') {
      api.get(`formtoday/${id}?data=${data}`)
      .then((response:any) => {
        setApiRes(response.data)
        setFormId(response.data.id)
        setTemp(response.data.temperatura)
        setApto(response.data.apto)
      })
      .catch(()=>{
        console.log('erro')
      })
    }
  },[data,id,estaApto,addTemp])

  useEffect(() => {
    if(nextDay != '') {
      api.get(`formtoday/${id}?data=${nextDay}`)
      .then((response:any) => {
        setApiNextDay(response.data)
      })
      .catch(()=>{
        console.log('erro')
      })
    }
  },[nextDay,id])

  useEffect(() => {
    if(apiRes == null || apiRes.length == 0){
      setQuizToday(false)
    }
    else{
      setQuizToday(true)
    }
  },[apiRes,finalized])

  useEffect(() => {
    if(apiNextDay == null || apiNextDay.length == 0){
      setQuizNextDay(false)
    }
    else{
      setQuizNextDay(true)
    }
  },[apiNextDay])

  useEffect(() => {
    if(finalized == true || quizToday == true) {
      if(nextFinalized == true || quizNextDay == true) {
        
      }
      else {
        setRealizou(`Você já realizou seu questionário de sintomas da covid-19 do dia ${userDate}`)
      }
    }
    else{
      setRealizou(`Você ainda não realizou seu questionário de sintomas da covid-19 do dia ${userDate}`)
    }
  },[finalized,quizToday,data])

  useEffect(() => {
    if(finalized == true || quizToday == true) {
      if(temp != 30.2 || addTemp == true) {
        setButtonText('Histórico')
        if(estaApto == true || apto == true) {
          return setPreButton("Você esta apto ao trabalho. Não esqueça de realizar o questionário amanha!")
        }
        if(estaApto == false || apto == false){
          return setPreButton("Você não esta apto ao trabalho. Comunique ao seu gestor!")
        }
      }
      if(temp == 30.2) {
        setButtonText('Adicionar Temperatura')
        setPreButton(`Você pode adicionar a sua temperatura até as 15:00 do dia ${userDate}`)
      }
    }
    else {
      setButtonText('Questionário')
      setPreButton("Você tem até as 15:00 horas para realiza-lo. Só será permitida a entrada após o término do questionário!")
    }
  },[finalized,quizToday,hours,estaApto,apto,temp,addTemp])

  const navigation = useNavigation()

  async function handleNavigateToQuiz() {
    if(finalized == true || quizToday == true) {
      if(temp != 30.2 || addTemp == true) {
        navigation.navigate('QuizNextDay', {
          id: id,
          nome: nome
        })
      }
      if(temp == 30.2) {
        navigation.navigate('Temperatura', {
          id: formId,
          nome: nome
        })
      }
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