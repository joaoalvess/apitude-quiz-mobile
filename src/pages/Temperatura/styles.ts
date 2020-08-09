import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ViewCenter = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const TextTemp = styled.Text`
  font-size: 18px;
  font-family: Roboto_500Medium;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TemperaturaNormal = styled.Text`
  font-size: 32px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #008000;
  text-align: center;
`;

export const TemperaturaAlta = styled.Text`
  font-size: 32px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #FFFF00;
  text-align: center;
`;

export const TemperaturaMuitoAlta = styled.Text`
  font-size: 32px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  color: #B22222;
  text-align: center;
`;

export const ViewTemp = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align:center;
  width: 300px;
  font-family: Roboto_500Medium;
  margin-bottom: 20px;
`;

export const ImageLogo = styled.Image`
  width: 250px;
  margin-bottom: 40px
`;

export const Cargo = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  font-family: Roboto_400Regular;
  text-align: center;
`;
