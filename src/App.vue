<template>
  <div id="app">
    <button @click="say()">文字驱动数字人</button>
    <button @click="tooglemute()">静音/取消</button>
    <button @click="say1()">第二局</button>
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
        robotMode: null,
        groupId: 'pingan',
        robotCode: '243794068751126528',
      })

      this.duix.on('detectedSpeech', (text) => {
        console.log(text.asrText)
        this.duix.speak(text.asrText)
      })
      this.duix.on('progress', (state) => {
        console.log('state', state)
      })
      this.duix.on('asr', (text) => {
        console.log('收到了asr', text)
        this.duix.speak(text)
      })
      this.tooglemute()
    },
    say1() {
      this.duix.speak('刘伯承，辛亥革命时期从军，1926年加入中国共产党。相继参加了北伐战争、八一南昌起义、土地革命战争、长征、抗日战争、解放战争等。建国后，历任中共中央西南局第二书记，西南军政委员会主席，中国人民解放军军事学院院长兼政委，中央人民政府人民革命军事委员会副主席。1955年被授予元帅军衔。1986年10月7日，刘伯承在北京逝世，终年94岁。。')
    },
    say() {
      this.duix.speak('彭德怀于1928年加入中国共产党，第二次国内革命战争时期历任中国工农红军师长、军长、三军团总指挥、中华苏维埃共和国中央革命军事委员会副主席')
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
