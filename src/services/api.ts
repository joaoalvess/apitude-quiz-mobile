import axios from 'axios'

const api = axios.create({
  baseURL: 'https://emprel-sever.herokuapp.com/'
})

export default api