<template>
  <div id="app">
    <button @click="say()">文字驱动数字人</button>
    <button @click="unmute()">取消静音</button>
    <button @click="reload()">重新加载</button>
    <div class="dt"></div>
  </div>
</template>

<script>
import DUIX from 'duix-guiji'
import VConsole from 'vconsole'

export default {
  name: 'Home',
  created(){
  },
  methods:{
    initDh(){
      this.duix = new DUIX({
          container: '.dt',
          token: '',
          robotMode: 'drive',
          robotCode: '243794068751126528',
      })
    },
    say(){
      this.duix.speak('你好，欢迎使用硅基智能的数字人对话产品。') 
    },
    unmute(){
      this.duix.setVideoMuted(false)
    },
    reload(){
      this.duix.stop()
      this.initDh()
    }
  },
  mounted(){
    new VConsole()
    this.initDh()
  },
  components: {
  }
}
</script>

<style>
.dt{
  width:337px;
  height: 600px;
}
</style>
