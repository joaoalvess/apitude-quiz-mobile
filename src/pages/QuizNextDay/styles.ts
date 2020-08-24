import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: -30px
`;

export const Scroll = styled.ScrollView`
  margin-right: 10px;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align:center;
  width: 300px;
  font-family: Roboto_500Medium;
  top: -80px;
`;

export const ImageLogo = styled.Image`
  width: 250px;
  height: 300px;
`;

export const Cargo = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: -50px;
  font-family: Roboto_400Regular;
`;

export const ViewTemp = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 15px
`;

export const ViewCenter = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px
`;

export const TextTemp = styled.Text`
  font-size: 16px;
  font-family: Roboto_500Medium;
  margin-top: 10px;
`;

export const TemperaturaNormal = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #008000;
`;

export const TemperaturaAlta = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #FFFF00;
`;

export const TemperaturaMuitoAlta = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #B22222;
  text-align: center;
`;

export const Pergunta = styled.Text`
  font-size: 16px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: Roboto_400Regular;
`;

export const Letra = styled.Text`
  font-size: 16px;
  margin-left: 40px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-family: Roboto_500Medium;
`;

export const LetraBaixo = styled.Text`
  font-size: 16px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: Roboto_500Medium;
`;

export const Form = styled.View`
  width: 350px
`;

export const LastForm = styled.View`
  justify-content:center;
  align-items: center;
  margin-bottom: 15px;
`;

export const Sintomas = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SimouNao = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const Bolean = StyleSheet.create({
  Container: {

  },
  Button: {
    backgroundColor: '#6272a4',
    width: 300,
    height: 60,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});