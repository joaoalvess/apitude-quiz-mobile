import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: 278px;
  height: 50px;
  background: #f4f4f5;
  border: 2px #958f90;
  border-radius: 5px;
  border-width: 1px;
  padding-right: 16px;
  padding-left: 16px;
  font-family: Roboto_400Regular;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Form = styled.KeyboardAvoidingView`
  align-self: stretch;
  padding-left: 15%;
  margin-bottom: 50px;
  margin-top: 20px
`;
