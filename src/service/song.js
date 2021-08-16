import { get } from './axios'

// 获取歌曲
export const getSongUrl = (id) => {
  return get('/song/url', { id })
}

export const processSongs = async (songs) => {
  const id = songs.map(item => item.id).join(',')
  const { data } = await getSongUrl(id)
  const urls = {}
  data.map(item => { urls[item.id] = item })
  songs.forEach(item => Object.assign(item, urls[item.id]))
  return songs
}
