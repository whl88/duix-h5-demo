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
      recText: '按下录音',
      liveText: '开始麦克风实时驱动',
      emuted: true,
      openMic: false,
    }
  },
  created() {},
  methods: {
    initDh() {
      this.duix = new DUIX({
        containerLable: '.dt',
        sign: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjE1MzY2MzkzMTc0NDU4NDA4OTYiLCJleHAiOjE2NTY3NDM2NjEsImlhdCI6MTY1NjY1NzI2MX0._rT11JEwSjkBWn6iUfGSttoA6cTRCS5FABtxPzrNoHk',
      })

      this.duix.on('intialSucccess', () => {
        console.log('on intialSucccess')
        this.duix.start({
          robotMode: 'null',
          transparent: true,
          muted: true,
        })
      })
      this.duix.on('busy', function () {
        console.log('on busy')
      })
      this.duix.on('bye', function () {
        console.log('on bye')
      })

      this.duix.setVideoMuted(false)
    },
    say() {
      this.duix.speak(
        '彭德怀于1928年加入中国共产党，第二次国内革命战争时期历任中国工农红军师长、军长、三军团总指挥、中华苏维埃共和国中央革命军事委员会副主席'
      )
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
      this.duix.startRecord()
    },
    finishRec() {
      this.recText = '按下录音'
      this.duix.stopRecord({success:function(data){
        console.log('识别结果', data)
      }})
    },

    toogleLive() {
      if (this.living) {
        this.living = false
        this.duix.closeAsr()
        this.liveText = '开始麦克风实时驱动'
      } else {
        this.living = true
        this.duix.openAsr({result: (data) => {
          console.log('实时识别', data)
          this.duix.speak(data)
        }})
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
  background: rgb(72, 72, 126);
  width: 337px;
  height: 600px;
}
</style>
