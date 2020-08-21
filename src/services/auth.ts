import api from './api'

interface Response {
  cpf: string
  senha: string
  id: number
  nome: string
}

async function singIn(selectCpf:string, selectSenha:string): Promise<Response> {
  return await api.get(`userauth?cpf=${selectCpf}&senha=${selectSenha}`)
  .then((response:any) => {
    return response.data
  })
  .catch((response:any) => {
    alert("Email ou senha incorretos")
    return response.data
  })
}

export default singIn