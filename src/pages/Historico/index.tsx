import React, { useState, useEffect } from 'react';
import { View, Button, Platform, TouchableOpacity} from 'react-native';
import { Container, Resposta } from './styles';
import { Title, Cargo, ImageLogo, Pergunta, Bolean, Letra, SimouNao, Sintomas, LetraBaixo, TextTemp, ViewTemp, TemperaturaAlta, TemperaturaMuitoAlta, TemperaturaNormal } from '../Quiz/styles'
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
    contato_infectado:Boolean,
    tosse:Boolean,
    febre:Boolean,
    falta_ar:Boolean,
    calafrio:Boolean,
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

  const [temperaturaNormal, settemperaturaNormal] = useState<Boolean>();
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
      }).catch(()=>{
        console.log("Formulário não encontrado")
      })
    }
  },[today,date,dia])

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  function handleNavigateToPerfil() {
    navigation.navigate('Perfil')
  }

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
        <Pergunta>
          1. Você teve contato próximo com alguma pessoa testada positiva para COVID-19 nos últimos 14 dias?
        </Pergunta>
          {data.contato_infectado ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
        <Pergunta>
          2. Você apresentou algum dos seguintes sintomas nas últimas 24 horas?
        </Pergunta>
        <Sintomas>
          <SimouNao>
            <Letra style={Bolean.Text}>A. Febre</Letra>
            {data.febre ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          </SimouNao>
          <SimouNao>
            <Letra>B. Calafrios</Letra>
            {data.calafrio ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          </SimouNao>
        </Sintomas>
        <Sintomas>
          <SimouNao>
            <LetraBaixo>C. Falta de Ar</LetraBaixo>
            {data.falta_ar ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
          </SimouNao>
        <SimouNao>
          <Letra>D. Tosse</Letra>
          {data.tosse ? <Resposta>Sim</Resposta> : <Resposta>Não</Resposta>}
        </SimouNao>
      </Sintomas>
      <TextTemp>Temperatura:</TextTemp>
      <ViewTemp>
        { tempAlta ? tempMuitoAlta ? <TemperaturaMuitoAlta>{data.temperatura}</TemperaturaMuitoAlta> : <TemperaturaAlta>{data.temperatura}</TemperaturaAlta> : <TemperaturaNormal>{data.temperatura}</TemperaturaNormal>}
      </ViewTemp>           
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