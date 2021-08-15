import { get } from './axios'

// 获取歌手列表
export const getSingerList = () => {
  return get('/top/artists?offset=0&limit=500')
}
