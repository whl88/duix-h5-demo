<template>
  <div id="app">
    <button @click="say()">文字驱动数字人</button>
    <button @click="unmute()">取消静音</button>
    <button @click="reload()">重新加载</button>
    <button @mousedown="startRec" @mouseup="finishRec">{{ recText }}</button>
    <div class="dt"></div>
  </div>
</template>

<script>
import DUIX from 'duix-guiji'
import VConsole from 'vconsole'

export default {
  name: 'Home',
  data: function () {
    return {
      isRecInited: false,
      recText: '按下录音',
    }
  },
  created() {},
  methods: {
    initDh() {
      this.duix = new DUIX({
        container: '.dt',
        token: '',
        robotMode: 'drive',
        robotCode: '245982983437047536',
      })
    },
    say() {
      this.duix.speak('你好，欢迎使用硅基智能的数字人对话产品。')
    },
    unmute() {
      this.duix.setVideoMuted(false)
    },
    reload() {
      this.duix.stop()
      this.initDh()
    },
    async startRec() {
      this.recText = '松开完成录音'
      if (!this.isRecInited) {
        await this.duix.initRec()
      }
      this.duix.startRecord()
    },
    finishRec() {
      this.recText = '按下录音'
      this.duix.stopRecord()
    },
  },
  mounted() {
    new VConsole()
    this.initDh()
  },
  components: {},
}
</script>

<style>
.dt {
  width: 337px;
  height: 600px;
}
</style>
