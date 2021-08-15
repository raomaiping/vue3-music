import { get } from './axios'

// 轮播图
export const getBanner = () => {
  return get('/banner?type=1')
}

// 获取推荐歌单
export const getPlaylist = () => {
  return get('/personalized')
}
