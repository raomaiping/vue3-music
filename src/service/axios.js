import axios from 'axios'

const baseURL = 'https://netease-cloud-music-api-beta-six.vercel.app'

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
