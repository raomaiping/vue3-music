import axios from 'axios'

const baseURL = 'http://www.jsfan.net:3001'

axios.defaults.baseURL = baseURL

export const get = (url, params) => {
  return axios
    .get(url, {
      params
    })
    .then(res => {
      return res.data
    })
    .catch(e => console.log(e))
}
