import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Title, ImageLogo, Cargo, Pergunta, Sintomas, Letra, SimouNao, Bolean, TemperaturaNormal, TemperaturaAlta, TemperaturaMuitoAlta, LetraBaixo, ViewTemp, TextTemp } from './styles';
import Logo from '../../assets/logo.png'
import api from '../../services/api'

import { TextButton, styles } from '../../components/Button/styles'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { returnButton } from '../../components/ReturnButton/styles'

import RNPickerSelect from 'react-native-picker-select';
// @ts-ignore
import { Chevron } from 'react-native-shapes'
import { AntDesign } from '@expo/vector-icons';
import { AntDesign as ReturnIcon } from '@expo/vector-icons'

const Quiz: React.FC = ({route}) => {
  const navigation = useNavigation()
  
  const {id,nome} = route.params

  const [day, setDay] = useState("")
  const [severDate, setSeverDate] = useState("")

  const [selectContato, setSelectContato] = useState<Boolean>(false);
  const [selectFebre, setSelectFebre] = useState<Boolean>(false);
  const [calafrios, setCalafrios] = useState<Boolean>(false);
  const [ar, setAr] = useState<Boolean>(false);
  const [selectTosse, setSelectTosse] = useState<Boolean>(false);

  const [selectTemperatura, setSelectTemperatura] = useState<number>(36.0);
  const [tempAlta, setTempAlta] = useState<Boolean>(false);
  const [tempMuitoAlta, setTempMuitoAlta] = useState<Boolean>(false);
  const [estaApto, setEstaApto] = useState<Boolean>(true);

  const [finish, setFinish] = useState(false)

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();

  function handleNavigateBack() {
    navigation.goBack()
  }

  useEffect(() => {
    if(selectContato == true || selectFebre == true || selectTosse == true || ar == true || calafrios == true || selectTemperatura >= 37.8){
      setEstaApto(false)
    }
    else{
      setEstaApto(true)
    }
  },[selectTemperatura,selectTosse,selectContato,selectFebre,calafrios,ar,day])

  useEffect(() => {
    setDay(date + '/' + month + '/' + year)
  },[date])
  
  useEffect(() => {
    setSeverDate(`${date}${month}${year}`)
  },[date])

  useEffect(() => {
    if(selectTemperatura >= 37.2) {
      setTempAlta(true)
    }
    if(selectTemperatura < 37.2){
      setTempAlta(false)
    }
  },[selectTemperatura])

  useEffect(() => {
    if(selectTemperatura >= 37.8) {
      setTempMuitoAlta(true)
    }
    if(selectTemperatura < 37.8){
      setTempMuitoAlta(false)
    }
  },[selectTemperatura])

  function aumentaTemperatura() {
    const tempAumentado:any = selectTemperatura + 0.1
    const newTemp = parseFloat(tempAumentado.toFixed(2))

    return setSelectTemperatura(newTemp)
  }

  function diminueTemperatura() {
    const tempDiminuido:any = selectTemperatura - 0.1
    const newTemp = parseFloat(tempDiminuido.toFixed(2))

    return setSelectTemperatura(newTemp)
  }

  async function handleSubmit() {
    const currentUser = id
    const data = severDate
    const contato_infectado = selectContato
    const febre = selectFebre
    const calafrio = calafrios
    const falta_ar = ar
    const tosse = selectTosse
    const temperatura = selectTemperatura
    const apto = estaApto

    const formData = {
      forms:{
        data,
        contato_infectado,
        febre,
        calafrio,
        falta_ar,
        tosse,
        temperatura,
        apto
      }
    }

    await api.post(`createform/${currentUser}`, formData).then(()=>{
      alert("Questionario enviado")
      navigation.navigate('Dashboard', {
        finalized: true,
        estaApto: estaApto
      })
    })
  }

  return (
    <Container>
      <ImageLogo resizeMode="contain" source={Logo} />
      <View style={returnButton.ReturnButton}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <ReturnIcon name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Title>Questionário de Sintomas {day}</Title>
      <Cargo>Colaborador: {nome}</Cargo>
      <Pergunta>1. Você teve contato próximo com alguma pessoa testada positiva para COVID-19 nos últimos 14 dias?</Pergunta>
      <RNPickerSelect
        items={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        onValueChange={(value: Boolean) => setSelectContato(value)}
        style={{
          inputAndroid: {
            backgroundColor: 'transparent',
            width: 100,
            height: 50,
            fontSize: 16,
            marginRight: 10,
            marginLeft: 50,
          },
          iconContainer: {
            top: 17,
            right: 15,
            marginRight: 40
          },
          inputIOS:{
            marginHorizontal: 50,
            fontSize: 18,
            height: 40,
          },
          inputIOSContainer:{

          }
        }}
        value={selectContato}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
        />
      <Pergunta>
        2. Você apresentou algum dos seguintes sintomas nas últimas 24 horas?
      </Pergunta>
      <Sintomas>
        <SimouNao>
          <Letra style={Bolean.Text}>A. Febre</Letra>
          <RNPickerSelect
            items={[
              { label: 'Sim', value: true },
              { label: 'Não', value: false },
            ]}
            onValueChange={(value: Boolean) => setSelectFebre(value)}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
                width: 100,
                height: 50,
                fontSize: 16,
                marginRight: 10,
                marginLeft: 50,
              },
              iconContainer: {
                top: 17,
                right: 20,
                marginRight: 30
              },
              inputIOS:{
                marginHorizontal: 50,
                fontSize: 18,
                height: 40,
              },
              inputIOSContainer:{

              }
            }}
            value={selectFebre}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Chevron size={1.5} color="gray" />;
            }}
          />
        </SimouNao>
        <SimouNao>
          <Letra>B. Calafrios</Letra>
          <RNPickerSelect
        items={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        onValueChange={(value: Boolean) => setCalafrios(value)}
        style={{
          inputAndroid: {
            backgroundColor: 'transparent',
            width: 100,
            height: 50,
            fontSize: 16,
            marginRight: 10,
            marginLeft: 50,
          },
          iconContainer: {
            top: 17,
            right: 15,
            marginRight: 55
          },
          inputIOS:{
            marginHorizontal: 50,
            fontSize: 18,
            height: 40,
          },
          inputIOSContainer:{

          }
        }}
        value={calafrios}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
        />
        </SimouNao>
      </Sintomas>
      <Sintomas>
        <SimouNao>
          <LetraBaixo>C. Falta de Ar</LetraBaixo>
          <RNPickerSelect
        items={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        onValueChange={(value: Boolean) => setAr(value)}
        style={{
          inputAndroid: {
            backgroundColor: 'transparent',
            width: 100,
            height: 50,
            fontSize: 16,
            marginRight: 15,
            marginLeft: 35,
          },
          iconContainer: {
            top: 17,
            right: 15,
            marginRight: 35
          },
          inputIOS:{
            marginHorizontal: 35,
            fontSize: 18,
            height: 40,
          },
          inputIOSContainer:{

          }
        }}
        value={ar}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
        />
        </SimouNao>
        <SimouNao>
          <Letra>D. Tosse</Letra>
          <RNPickerSelect
        items={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        onValueChange={(value: Boolean) => setSelectTosse(value)}
        style={{
          inputAndroid: {
            backgroundColor: 'transparent',
            width: 100,
            height: 50,
            fontSize: 16,
            marginRight: 10,
            marginLeft: 50,
          },
          iconContainer: {
            top: 17,
            right: 15,
            marginRight: 35
          },
          inputIOS:{
            marginHorizontal: 50,
            fontSize: 18,
            height: 40,
          },
        }}
        value={selectTosse}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
        />
        </SimouNao>
      </Sintomas>
      <TextTemp>Temperatura:</TextTemp>
      <ViewTemp>
        <TouchableOpacity onPress={diminueTemperatura} >
          <AntDesign name="minuscircleo" size={30} color="black" />
        </TouchableOpacity>
      { tempAlta ? tempMuitoAlta ? <TemperaturaMuitoAlta>{selectTemperatura}</TemperaturaMuitoAlta> : <TemperaturaAlta>{selectTemperatura}</TemperaturaAlta> : <TemperaturaNormal>{selectTemperatura}</TemperaturaNormal>}
        <TouchableOpacity onPress={aumentaTemperatura} >
          <AntDesign name="pluscircleo" size={30} color="black" />
        </TouchableOpacity>
      </ViewTemp>
      <RectButton
        style={styles.button}
        onPress={handleSubmit}
      >
        <TextButton>Enviar</TextButton>
      </RectButton>
    </Container>
  );
}

export default Quiz;