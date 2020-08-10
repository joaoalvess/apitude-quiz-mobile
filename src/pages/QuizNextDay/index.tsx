import React, {useState, useEffect} from 'react';
import { AppLoading } from 'expo'
import { View, TouchableOpacity } from 'react-native';
import { Container, Title, ImageLogo, Cargo, Pergunta, Sintomas, Letra, SimouNao, Bolean, TemperaturaNormal, TemperaturaAlta, TemperaturaMuitoAlta, LetraBaixo, ViewTemp, TextTemp, Scroll, ViewCenter, Form, LastForm } from './styles';
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

const QuizNextDay: React.FC = ({route}:any) => {
  const navigation = useNavigation()

  const {id,nome} = route.params

  const [loading, setLoading] = useState<Boolean>(true)
  
  const [day, setDay] = useState("")

  const [selectInfectado, setSelectInfectado] = useState<Boolean>(false);
  const [selectContato, setSelectContato] = useState<Boolean>(false);

  const [selectFebre, setSelectFebre] = useState<Boolean>(false);
  const [calafrios, setCalafrios] = useState<Boolean>(false);
  const [ar, setAr] = useState<Boolean>(false);
  const [selectTosse, setSelectTosse] = useState<Boolean>(false);
  const [selectGarganta, setSelectGarganta] = useState<Boolean>(false);
  const [selectCabeça, setSelectCabeça] = useState<Boolean>(false);
  const [selectCorpo, setSelectCorpo] = useState<Boolean>(false);
  const [selectOlfato, setSelectOlfato] = useState<Boolean>(false);
  const [selectPaladar, setselectPaladar] = useState<Boolean>(false);

  const [estaApto, setEstaApto] = useState<Boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [nextDay, setNextDay] = useState('')

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

  function handleNavigateBack() {
    navigation.goBack()
  }

  useEffect(() => {
    if(selectContato == true || totalCount > 2 ){
      setEstaApto(false)

      if(selectInfectado == true){
        setEstaApto(true)
      }
    }
    else {
      setEstaApto(true)
    }
  },[selectContato,totalCount,day])

  useEffect(() => {
    setDay(`${diaAtual}/${mesAtual}/${anoAtual}`)
    setNextDay(`${diaAtual}${mesAtual}${anoAtual}`)
  },[diaAtual])

  async function handleSubmit() {
    const currentUser = id
    const data = nextDay
    const infectado = selectInfectado
    const contato_infectado = selectContato
    const febre = selectFebre
    const calafrio = calafrios
    const falta_ar = ar
    const tosse = selectTosse
    const garganta = selectGarganta
    const cabeça = selectCabeça
    const corpo = selectCorpo
    const olfato = selectOlfato
    const paladar = selectPaladar
    const apto = estaApto
    const temperatura = 30.2
    const count = totalCount

    const formData = {
      data,
      infectado,
      contato_infectado,
      febre,
      calafrio,
      falta_ar,
      tosse,
      garganta,
      cabeça,
      corpo,
      olfato,
      paladar,
      apto,
      temperatura,
      count
    }

    setLoading(false)
    await api.post(`createform/${currentUser}`, formData).then(() => {
      setLoading(true)
      if(totalCount <= 2 && totalCount > 0 && apto == true){
        alert(`Você apresentou ${totalCount} sintoma(s) da covid-19 caso sinta mais algum sintoma avise ao seu gestor!`)
      }
      if(apto == false){
        alert(`Você não esta apto ao trabalho no dia ${day} entre em contato com o seu gestor!`)
      }
      if(apto == true && totalCount == 0){
        alert(`Formulario enviado do dia ${day} enviado, você só podera adicionar a temperatura no dia ${day}!`)
      }
      navigation.navigate('Dashboard', {
        nextFinalized: true,
        estaApto: estaApto
      })
    })
    .catch(() => {
      setLoading(true)
      console.log("error")
    })
  }

  if(!loading){
    return <AppLoading />
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
      <Scroll>
      <Pergunta>1. Você teve Covid-19??</Pergunta>
      <RNPickerSelect
        items={[
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]}
        onValueChange={(value: Boolean) => setSelectInfectado(value)}
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
        value={selectInfectado}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
      />
      <Pergunta>
        2. Você apresentou algum dos seguintes sintomas nas últimas 24 horas?
      </Pergunta>
      <Form>
        <Sintomas>
          <SimouNao>
            <Letra>A. Febre</Letra>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectFebre(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  width: 100,
                  height: 50,
                  fontSize: 16,
                  marginRight: 10,
                  marginLeft: 35,
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
              onValueChange={(value: Boolean) => {setCalafrios(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  width: 100,
                  height: 50,
                  fontSize: 16,
                  marginRight: 10,
                  marginLeft: 60,
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
            <Letra>C. Falta de Ar</Letra>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setAr(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
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
                  marginRight: 67
                },
                inputIOS:{
                  marginHorizontal: 55,
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
            <LetraBaixo>D. Dor de cabeça</LetraBaixo>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectCabeça(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
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
                  marginRight: 60
                },
                inputIOS:{
                  marginHorizontal: 50,
                  fontSize: 18,
                  height: 40,
                },
              }}
              value={selectCabeça}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
            />
          </SimouNao>
        </Sintomas>
        <Sintomas>
          <SimouNao>
            <Letra>E. Dor de garganta</Letra>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectGarganta(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
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
                  marginRight: 98
                },
                inputIOS:{
                  marginHorizontal: 60,
                  fontSize: 18,
                  height: 40,
                },
                inputIOSContainer:{

                }
              }}
              value={selectGarganta}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
            />
          </SimouNao>
          <SimouNao>
            <LetraBaixo>F. Tosse</LetraBaixo>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectTosse(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  width: 100,
                  height: 50,
                  fontSize: 16,
                  marginRight: 10,
                  marginLeft: 10,
                },
                iconContainer: {
                  top: 17,
                  right: 15,
                  marginRight: 35
                },
                inputIOS:{
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
        <Sintomas>
          <SimouNao>
            <Letra>G. Falta de olfato</Letra>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectOlfato(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
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
                  marginRight: 98
                },
                inputIOS:{
                  marginHorizontal: 60,
                  fontSize: 18,
                  height: 40,
                },
                inputIOSContainer:{

                }
              }}
              value={selectOlfato}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
            />
          </SimouNao>
          <SimouNao>
            <LetraBaixo>H. Falta de paladar</LetraBaixo>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setselectPaladar(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  width: 100,
                  height: 50,
                  fontSize: 16,
                  marginRight: 10,
                  marginLeft: 10,
                },
                iconContainer: {
                  top: 17,
                  right: 15,
                  marginRight: 35
                },
                inputIOS:{
                  fontSize: 18,
                  height: 40,
                },
              }}
              value={selectPaladar}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
            />
          </SimouNao>
        </Sintomas>
      </Form>
      <LastForm>
            <Letra>I. Dor no Corpo</Letra>
            <RNPickerSelect
              items={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              onValueChange={(value: Boolean) => {setSelectCorpo(value)
                if(value == true){
                  setTotalCount(totalCount + 1)
                }
                if(value == false) {
                  setTotalCount(totalCount - 1)
                }              
              }}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  width: 100,
                  height: 50,
                  fontSize: 16,
                  marginRight: 10,
                  marginLeft: 10,
                },
                iconContainer: {
                  top: 17,
                  right: 15,
                  marginRight: 35
                },
                inputIOS:{
                  fontSize: 18,
                  height: 40,
                  marginLeft: 150
                },
              }}
              value={selectCorpo}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
            />
      </LastForm>
      <Pergunta>3. Você teve contato próximo com alguma pessoa testada positiva para COVID-19 nos últimos 14 dias?</Pergunta>
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
      <ViewTemp>
      { estaApto ? null: <TemperaturaMuitoAlta>Vocé não está apto ao trabalho!</TemperaturaMuitoAlta>}
      </ViewTemp>
      <ViewCenter>
        <RectButton
          style={styles.button}
          onPress={handleSubmit}
        >
          <TextButton>Enviar</TextButton>
        </RectButton>
      </ViewCenter>
      </Scroll>
    </Container>
  );
}

export default QuizNextDay;