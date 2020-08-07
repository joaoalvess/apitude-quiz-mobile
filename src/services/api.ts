const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://emprel-sever.herokuapp.com/'
})

export default api