<template>
  <div id="app">
    <button @click="say()">文字驱动数字人</button>
    <div class="dt"></div>
  </div>
</template>

<script>
import DUIX from 'duix-guiji'

export default {
  name: 'Home',
  created(){
  },
  methods:{
    say(){
      this.duix.speak('你好，欢迎使用硅基智能的数字人对话产品。') 
    },
  },
  mounted(){
    this.duix = new DUIX(
     {
        container: '.dt',
        token: '',
        robotMode: 'drive',
        robotCode: '245982983437047536',
     }
   )
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
