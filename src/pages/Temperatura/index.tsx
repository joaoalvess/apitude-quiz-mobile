import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity, } from 'react-native';
import { Container, TemperaturaMuitoAlta, TemperaturaNormal, TemperaturaAlta, ViewTemp, ImageLogo, Title, Cargo, TextTemp } from './styles';
import { TextButton, styles } from '../../components/Button/styles'
import { returnButton } from '../../components/ReturnButton/styles'

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import Logo from '../../assets/logo.png'
import { AntDesign } from '@expo/vector-icons';
import { AntDesign as ReturnIcon } from '@expo/vector-icons'

const Temperatura: React.FC = ({route}: any) => {
  const [selectTemperatura, setSelectTemperatura] = useState(36.0)
  const [tempAlta, setTempAlta] = useState<Boolean>()
  const [tempMuitoAlta, setTempMuitoAlta] = useState<Boolean>()

  const [day, setDay] = useState("")
  const [severDate, setSeverDate] = useState("")

  const { nome, id } = route.params

  const navigation = useNavigation()

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();

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

  useEffect(() => {
    setDay(date + '/' + month + '/' + year)
    setSeverDate(`${date}${month}${year}`)
  },[date])

  function handleNavigateBack() {
    navigation.goBack()
  }

  async function onSubmit() {
    const temperatura = selectTemperatura

    const formData = {
      temperatura
    }
    
    await api.put(`formtemp/${id}`, formData).then(() => {
      alert('Temperatura Adicionada')
      navigation.navigate('Dashboard', {
        addTemp: true
      })
    }).catch(() => {
      alert('ocorreu um erro tente novamente!')
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
      <Title>Questionário de Sintomas {day}</Title>
      <Cargo>Colaborador: {nome}</Cargo>
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
        onPress={onSubmit}
      >
        <TextButton>Adicionar</TextButton>
      </RectButton>
    </Container>
  );
}

export default Temperatura;