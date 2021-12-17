<template>
  <div id="app">
    <button @click="say()">文字驱动数字人</button>
    <button @click="tooglemute()">静音/取消</button>
    <button @click="reload()">重新加载</button>
    <button @mousedown="startRec" @mouseup="finishRec">{{ recText }}</button>
    <button @click="toogleLive">{{ liveText }}</button>
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
      liveText: '开始麦克风实时驱动',
      emuted: true,
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

      this.duix.on('detectedSpeech', (text) => {
        console.log(text)
        this.speak(text)
      })
    },
    say() {
      this.duix.speak('你好，欢迎使用硅基智能的数字人对话产品。')
    },
    tooglemute() {
      this.duix.setVideoMuted(!this.emuted)
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
    toogleLive() {
      if (this.living) {
        this.living = false
        this.duix.closeLive()
        this.liveText = '开始麦克风实时驱动'
      } else {
        this.living = true
        this.duix.startLive()
        this.liveText = '关闭麦克风实时驱动'
      }
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
