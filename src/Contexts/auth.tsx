import React, { useState, useEffect, createContext } from 'react'
import singIn from '../services/auth'
import AsyncStorage from '@react-native-community/async-storage';

interface AuthContextData {
  signed: boolean
  user: User | null
  login(selectCpf:String, selectSenha:String): Promise<void>
  logout(): void
}

interface User {
  id: number
  nome: string
  cpf: string
  senha: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('Auth:user')

      if(storageUser) {
        setUser(JSON.parse(storageUser))
      }
    }

    loadStorageData()
  },[])

  async function login(selectCpf:string, selectSenha:string) {
    const response = await singIn(selectCpf, selectSenha)

    if(response != undefined) {
      const {cpf, senha, id, nome} = response

      const data = {
        id,
        nome,
        cpf,
        senha
      }

      setUser(data)
      await AsyncStorage.setItem('Auth:user', JSON.stringify(data))
    }
    else {
      setUser(response)
    }
  }

  function logout() {
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext