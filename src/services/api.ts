const axios = require('axios').default;

const api = axios.create({
  baseURL: 'http://emprel-sever.herokuapp.com/'
})

export default api