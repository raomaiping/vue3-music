<template>
  <div class="singer" v-loading="!singers.length">
   <index-list :data="singers" @select="selectSinger"></index-list>
       <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
import pinyin from 'pinyin'
export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = this.processorSingerData(result.artists)
  },
  methods: {
    processorSingerData (singerData) {
      const singerList = []
      const data = {}
      singerData.map(item => {
        // 把歌手名转换为拼音
        const p = pinyin(item.name, {
          style: pinyin.STYLE_NORMAL // 设置拼音风格
        })
        // 获取拼音首字母转大写
        let title = p[0][0].slice(0, 1).toUpperCase()
        // 判断是否为字母
        if (!/^[a-zA-Z]+$/.test(title)) {
          title = '其他'
        }

        if (Array.isArray(data[title])) {
          data[title].push(item)
        } else {
          data[title] = [item]
        }
      })
      for (const key in data) {
        singerList.push({
          title: key,
          list: data[key]
        })
      }
      return singerList.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
    },
    selectSinger (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push(`/singer/${singer.id}`)
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}

</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
