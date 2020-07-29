import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const ViewMenu = styled.View`
  background: #2C4FA1;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextMenu = styled.Text`
  font-size: 14px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
  margin-top: -5px;
  font-family: Roboto_500Medium;
`;

export const Menu = StyleSheet.create({
  itens: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 10
  }
})