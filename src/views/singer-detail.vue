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
    pic () {
      return this.singer && this.singer.picUrl
    },
    title () {
      return this.singer && this.singer.name
    }
  },
  async created () {
    const result = await getSingerDetail(this.singer.id)
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
