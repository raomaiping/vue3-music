import axios from 'axios'

const baseURL = 'http://localhost:3000'

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
