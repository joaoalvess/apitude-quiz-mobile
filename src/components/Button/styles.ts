import  styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2C4FA1',
    height: 64,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    width: 300,
    marginBottom: 24,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  nobutton: {
    backgroundColor: '#2C4FA1',
    height: 64,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    width: 300,
    marginBottom: 24,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
  }
})

export const TextButton = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #f0f0f5;
  font-family: Roboto_500Medium;
  font-size: 22px;
`;

export const ViewCenterButton = styled.View`
  justify-content: center;
  align-items: center;
`;