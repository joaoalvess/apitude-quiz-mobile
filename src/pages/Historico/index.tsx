import React, { useState, useEffect } from 'react';
import { View, Button, Platform, TouchableOpacity} from 'react-native';
import { Resposta, RespostaTosse } from './styles';
import { Title, Cargo, ImageLogo, Pergunta, Letra, SimouNao, Sintomas, LetraBaixo, TextTemp, ViewTemp, TemperaturaAlta, TemperaturaMuitoAlta, TemperaturaNormal, Scroll, ViewCenter, LastForm, Form, Container } from '../Quiz/styles'
import { Menu, TextMenu, ViewMenu } from '../../components/Menu/styles'
import { styles } from '../../components/Button/styles'
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import DatePicker from 'react-native-datepicker'

interface Data {
    data:String,
    infectado: Boolean,
    contato_infectado:Boolean,
    tosse:Boolean,
    febre:Boolean,
    falta_ar:Boolean,
    calafrio:Boolean,
    corpo:Boolean,
    cabeça:Boolean,
    garganta:Boolean,
    olfato: Boolean,
    paladar: Boolean,
    apto:Boolean,
    temperatura:Number
}

const Historico: React.FC = ({route}:any) => {
  const navigation = useNavigation()

  const {id,nome} = route.params

  const [today, setToday] = useState('');
  const [date, setDate] = useState('');
  const [dia, setDia] = useState('');
  const [data, setData] = useState<Data>({} as Data);

  const [apiRes, setApiRes] = useState([]);
  const [quizToday, setQuizToday] = useState<Boolean>();

  const [checkTemp, setCheckTemp] = useState<Boolean>();
  const [tempMuitoAlta, setTempMuitoAlta] = useState<Boolean>();
  const [tempAlta, setTempAlta] = useState<Boolean>();

  var day = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();

  useEffect(() => {
    setDia(`${day}${month}${year}`)
    setToday(day + '/' + month + '/' + year)
  },[])

  useEffect(()=>{
    if(date != ''){
      const split = date
      const dia = split.split("-")
      const selectday = `${dia[0]}/${dia[1]}/${dia[2]}`
      setToday(selectday)
    }
  },[date])
  
  useEffect(() => {
    if(date != ''){
      const split = date
      const dia = split.split("-")
      const selectday = `${dia[0]}${dia[1]}${dia[2]}`
  
      api.get(`formtoday/${id}?data=${selectday}`)
      .then((response:any) => {
        setData(response.data)
      })
      .catch(()=>{
        alert("Formulario não encontrado")
      })
    }
    else{
      api.get(`formtoday/${id}?data=${dia}`)
      .then((response:any) => {
        setData(response.data)
        setApiRes(response.data)
      }).catch(()=>{
        console.log("Formulário não encontrado")
      })
    }
  },[today,date,dia])

    useEffect(() => {
    if(apiRes == null || apiRes.length == 0){
      setQuizToday(false)
    }
    else{
      setQuizToday(true)
    }
  },[apiRes,])

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  function handleNavigateToPerfil() {
    navigation.navigate('Perfil', {
      id: id,
      nome: nome
    })
  }

  useEffect(() => {
    if(data.temperatura == 30.2) {
      setCheckTemp(false)
    }
    else {
      setCheckTemp(true)
    }
  },[data])

  useEffect(() => {
    if(data.temperatura >= 37.2) {
      setTempAlta(true)
    }
    if(data.temperatura < 37.2){
      setTempAlta(false)
    }
  },[data.temperatura])

  useEffect(() => {
    if(data.temperatura >= 37.8) {
      setTempMuitoAlta(true)
    }
    if(data.temperatura < 37.8){
      setTempMuitoAlta(false)
    }
  },[data.temperatura])

  return (
    <>
      <Container>
        <ImageLogo resizeMode="contain" source={Logo} />
        <Title>Questionário de Sintomas {today}</Title>
        <Cargo>Colaborador: {nome}</Cargo>
        { quizToday ? <Scroll>
          <Pergunta>1. Você teve Covid-19??</Pergunta>
            {data.infectado ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          <Pergunta>
            2. Você apresentou algum dos seguintes sintomas nas últimas 24 horas?
          </Pergunta>
          <Sintomas>
            <SimouNao>
              <Letra>A. Febre</Letra>
              {data.febre ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
            </SimouNao>
            <SimouNao>
              <Letra>B. Calafrios</Letra>
              {data.calafrio ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
            </SimouNao>
          </Sintomas>
          <Sintomas>
            <SimouNao>
              <Letra>C. Falta de Ar</Letra>
              {data.falta_ar ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
            </SimouNao>
            <SimouNao>
              <LetraBaixo>D. Dor de cabeça</LetraBaixo>
              {data.cabeça ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
            </SimouNao>
          </Sintomas>
          <Sintomas>
            <SimouNao>
              <Letra>E. Dor de garganta</Letra>
              {data.garganta ? <RespostaTosse>Sim</RespostaTosse> : <RespostaTosse>Não</RespostaTosse>}
            </SimouNao>
            <SimouNao>
              <LetraBaixo>F. Tosse</LetraBaixo>
              {data.tosse ? <RespostaTosse>Sim</RespostaTosse> : <RespostaTosse>Não</RespostaTosse>}
            </SimouNao>
          </Sintomas>
          <Sintomas>
            <SimouNao>
              <Letra>G. Falta de olfato</Letra>
              {data.olfato ? <RespostaTosse>Sim</RespostaTosse> : <RespostaTosse>Não</RespostaTosse>}
            </SimouNao>
            <SimouNao>
              <LetraBaixo>H. Dor no Corpo</LetraBaixo>
              {data.corpo ? <RespostaTosse>Sim</RespostaTosse> : <RespostaTosse>Não</RespostaTosse>}
            </SimouNao>
          </Sintomas>
          <LastForm>
            <Letra>I. Falta de paladar</Letra>
            {data.paladar ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          </LastForm>
          <Pergunta>
            3. Você teve contato próximo com alguma pessoa testada positiva para COVID-19 nos últimos 14 dias?
          </Pergunta>
            {data.contato_infectado ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          <ViewCenter>
            { data.apto ? <TemperaturaNormal>Você está apto ao trabalho!</TemperaturaNormal>: <TemperaturaMuitoAlta>Vocé não está apto ao trabalho!</TemperaturaMuitoAlta>}
          </ViewCenter>
          { checkTemp ? <ViewCenter>
            <TextTemp>Temperatura:</TextTemp>
          </ViewCenter> : null}
          <ViewTemp>
            { checkTemp ? tempAlta ? tempMuitoAlta ? <TemperaturaMuitoAlta>{data.temperatura}</TemperaturaMuitoAlta> : <TemperaturaAlta>{data.temperatura}</TemperaturaAlta> : <TemperaturaNormal>{data.temperatura}</TemperaturaNormal> : null}
          </ViewTemp>
          <ViewCenter>         
            <DatePicker
              style={{width: 200}}
              date={date}
              mode="date"
              placeholder="Escolha uma data"
              format="D-M-YYYY"
              minDate="01-01-2015"
              maxDate="01-01-2030"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  left: 0,
                  top: 4,
                },
                dateInput: {
                  marginLeft: 36,
                }
              }}
              onDateChange={(date:String) => {setDate(String(date))}}
            />
          </ViewCenter>  
        </Scroll> : <Title>Você ainda não realizou seu questionário hoje!</Title> }
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
          onPress={() => {}}
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

export default Historico;