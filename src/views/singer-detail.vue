<template>
  <div class="singer-detail">
    <music-list :songs="songs"
                :pic="pic"
                :loading="loading"
                :title="title"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  components: {
    MusicList
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    computedSinger () {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.id === +this.$route.params.id) {
          ret = cachedSinger
        }
      }
      return ret
    },
    pic () {
      const singer = this.computedSinger
      return singer && singer.picUrl
    },
    title () {
      const singer = this.computedSinger
      return singer && singer.name
    }
  },
  async created () {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push({ path })
      return
    }
    const result = await getSingerDetail(this.computedSinger.id)
    this.songs = await processSongs(result.hotSongs)
    this.loading = false
  }
}

</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
