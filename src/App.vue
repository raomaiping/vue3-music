<template>
  <my-header></my-header>
  <tab></tab>
  <router-view></router-view>
  <player></player>
</template>

<script>
import MyHeader from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from './components/player/player'
export default {
  components: {
    MyHeader,
    Tab,
    Player
  }
}
</script>
