import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ImageLogo = styled.Image`
  width: 250px;
  height: 300px;
  margin-bottom: -30px
`;

export const Title = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 28px;
  margin-bottom: 50px
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