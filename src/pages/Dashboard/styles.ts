import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-top: 30px
`;

export const ImageLogo = styled.Image`
  width: 250px;
  margin-bottom: 40px
`;

export const Title = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-family: Ubuntu_700Bold;
  font-size: 18px;
  width: 350px;
  text-align: center;
  margin-bottom: 50px
`;

export const PreButton = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 18px;
  width: 350px;
  text-align: center;
  margin-bottom: 40px;
`;

export const PosButton = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 18px;
  width: 350px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 25px
`;

export const TemperaturaNormal = styled.Text`
  font-size: 24px;
  color: #008000;
  text-align: center;
  margin-bottom: 30px;
  text-align: center;
`;

export const TemperaturaAlta = styled.Text`
  font-size: 24px;
  margin-bottom: 50px;
  color: #FFFF00;
`;

export const TemperaturaMuitoAlta = styled.Text`
  font-size: 24px;
  color: #008000;
  text-align: center;
  margin-bottom: 30px;
  color: #B22222;
  text-align: center;
`;

export const TextButtonMenor = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #f0f0f5;
  font-family: Roboto_500Medium;
  font-size: 18px;
`;

export const ViewCenter = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Scroll = styled.ScrollView`

`;
