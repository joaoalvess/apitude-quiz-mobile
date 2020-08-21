import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { Container, ImageLogo, Title, Subtitle, PreButton, PosButton, TemperaturaMuitoAlta, TemperaturaNormal, TextButtonMenor, Scroll, ViewCenter } from './styles';
import { TextButton, styles } from '../../components/Button/styles'
import AuthContext from '../../Contexts/auth';
import Logo from '../../assets/logo.png'

import api from '../../services/api'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import * as Updates from 'expo-updates'

const Dashboard: React.FC = ({route}:any) => {
  const [data, setData] = useState('')
  const [userDate, setUserDate] = useState('')
  const [quizToday, setQuizToday] = useState(false)
  const [apiRes, setApiRes] = useState([])
  const [apto, setApto] = useState()
  const [formId, setFormId] = useState()

  const [temp, setTemp] = useState<number>()
  const [nextDay, setNextDay] = useState('')
  const [nextUserDay, setNextUserDay] = useState('')
  const [apiNextDay, setApiNextDay] = useState([])
  const [quizNextDay, setQuizNextDay] = useState(false)
  const [finlizedNextDay, setFinlizedNextDay] = useState(false)
  const [checkTemp, setCheckTemp] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showQuiz, setShowQuiz] = useState(false)
  const [realizou, setRealizou] = useState('')
  const [preButton, setPreButton] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [fistName, setFistName] = useState('')
  
  const { finalized, estaApto } = route.params
  const { addTemp } = route.params
  const { nextFinalized } = route.params

  const { user } = useContext(AuthContext)

  const id = user?.id
  const nome = user?.nome

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if(isAvailable) {
        await Updates.fetchUpdateAsync()

        await Updates.reloadAsync()
      }
    } 

    updateApp()
  },[])

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
    setNextUserDay(`${diaAtual}/${mesAtual}/${anoAtual}`)
  },[date])

  useEffect(() => {
    const split = nome
    const name = split!.split(" ")
    setFistName(name[0])
  },[nome])

  useEffect(() => {
    if(data != '') {
      api.get(`formtoday/${id}?data=${data}`)
      .then((response:any) => {
        setApiRes(response.data)
        setFormId(response.data.id)
        setTemp(response.data.temperatura)
        setApto(response.data.apto)
        setLoading(true)
      })
      .catch(()=>{
        console.log('erro')
        setLoading(true)
      })
    }
  },[data,id,estaApto,addTemp,hours])

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
  },[nextDay,id,hours])

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
      if(temp != 30.2 || addTemp == true) {
        setCheckTemp(true)
      }
      if(temp == 30.2) {
        setRealizou("Você pode adicionar sua temperatura após a medir na entrada!")
        setCheckTemp(false)
      }
    }
    if(finalized == false || quizToday == false){
        setRealizou(`Você ainda não realizou seu questionário de sintomas da covid-19 do dia ${userDate}`)
    }
  },[finalized,quizToday,data,temp,addTemp])

  useEffect(() => {
    if(finalized == true || quizToday == true) {
      if(temp != 30.2 || addTemp == true) {
        setButtonText('Histórico')
      }
      if(temp == 30.2) {
        setButtonText('Temperatura')
      }
    }
    else {
      setButtonText('Questionário')
      setPreButton("Só será permitida a entrada após o término do questionário!")
    }
  },[finalized,quizToday,temp,addTemp])

  useEffect(() => {
    if(quizNextDay == true || nextFinalized == true) {
      setFinlizedNextDay(true)
    }
    else {
      setFinlizedNextDay(false)
    }
  },[apiNextDay,nextFinalized,quizNextDay])

  useEffect(() => {
    if(finalized == true || quizToday == true) {
      setShowQuiz(true)
    }
    else {
      setShowQuiz(false)
    }
  },[finalized, quizToday])

  const navigation = useNavigation()

  async function handleNavigateToQuiz() {
    if(finalized == true || quizToday == true) {
      if(temp != 30.2 || addTemp == true) {
        navigation.navigate('Historico', {
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

  function handleNavigateToQuizNextDay() {
    navigation.navigate('QuizNextDay', {
      id: id,
      nome: nome
    })
  }

  if(!loading) {
    return <AppLoading />
  }

  return (
    <>
      <Container>
        <Scroll>
        <ViewCenter>
          <ImageLogo resizeMode="contain" source={Logo} />
        </ViewCenter>
        <Title>Olá, {fistName}</Title>
        { apto != false ? checkTemp ? 
          <TemperaturaNormal>
            Você esta apto ao trabalho no dia {userDate}!
          </TemperaturaNormal> : 
          <Subtitle> {realizou} </Subtitle> : 
          <TemperaturaMuitoAlta>
            Você não esta apto ao trabalho no dia {userDate}!
          </TemperaturaMuitoAlta>
        }
        { hours >= 18 ? finlizedNextDay ? 
          <PreButton>
            Por favor volte amanhã para realizar seu próximo questionário!
          </PreButton> : 
          <PreButton> 
            Você também pode fazer seu questionário do dia {nextUserDay} 
          </PreButton> : 
          <PreButton> {preButton} </PreButton>
        }
        <ViewCenter>
          <RectButton
            style={styles.button}
            onPress={handleNavigateToQuiz}>
            <TextButton> {buttonText} </TextButton>
          </RectButton>
        </ViewCenter>
        <ViewCenter>
          { hours >= 18 ? finlizedNextDay ? 
          <PosButton>
            Você só pode adicionar a temperatura do questionário de {nextUserDay} no mesmo dia!
          </PosButton> :
          <RectButton
            style={styles.button}
            onPress={handleNavigateToQuizNextDay}>
            <TextButtonMenor>Questionário {nextUserDay} </TextButtonMenor>
          </RectButton> : null}
        </ViewCenter>
        <PosButton>Obrigado pela colaboração!</PosButton>
        <PreButton>Tenha um bom dia!</PreButton>
        </Scroll>
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