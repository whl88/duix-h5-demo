# 硅基DUIX H5 SDK使用文档
## 安装

```shell
# Install Duix
npm i duix-guiji -S
```

## 快速开始

[Demo 请点这里](https://duix.guiji.ai/document/demo/h5/index.html) [CodePen](https://codepen.io/wanghongliang/pen/GRvbwjL)

```js
import DUIX from 'duix-guiji'
const duix = new DUIX(
     {
        container: '.remote-container',
        token: 'xxxxxxxxx',
        robotMode: 'bot',
        robotCode: 'xxxxxxxxxxxxx',
     }
   )

```

## 选项

以上示例中的new DUIX(options)即可得到一个DUIX实例，其中option是一个配置对象，细节如下：

| 名称				| 类型				| 描述															| 默认值				| 示例																										|
| :-----------------| :--------------	| :-----------------------------------------------------------	| ------				| -------------------------------																			|
| container			| string			| rtc流渲染包裹层div的选择器									|    .remote-container	|    .remote-container																						|
| token				| string			| duix token，用来获取sdk初始化配置								|						|																											|
| robotMode			| string			| 驱动模式														|						| bot(对话模式)/drive(直驱模式)。 对话模式：数字人会针对您的输入作出回答。直驱模式：数字人仅说出您的输入。	|
| robotCode			| string			| 数字人Code													|						| 'xxxxxxxxxxxxxxx'																							|


## 方法

#### DUIX(options: object)构造函数

参数见如上表格

#### speak(content: string)

驱动数字人说话，支持文本驱动和音频文件驱动。

#### startLive()

开启麦克风驱动

#### closeLive()

关闭麦克风驱动

#### initRec()

初始化录音功能

#### startRecord()

开始录音

#### stopRecord()

结束录音



#### stop()

停止当前webrtc直播

#### setVideoMuted（）
设置当前视频是否静音 (注:该方法需要用户一次界面操作行为后执行)
https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

#### on(eventname,callback)

监听事件。

##### 参数：

###### eventname

事件名称，详见下方表格。

###### callback

## 事件

| 名称           | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| busy       | 服务端繁忙。    |
| detectedSpeech           | 客户端开启asr识别后，发送识别文本至客户端。(返回当前文本) |
| bye           | im结束通话发送事件。                                             |
| record-open          | 录音打开事件。                                             |
| record-progress          | 录音进度事件(返回当前录音音量，采样频率等)。                                                   |
| client-ready          | 和webrtc建立连接成功后回调事件。     
| progress          | 当前rtc进度事件。                                             |

### 版本记录：
1.0.26  

1.sdk内部去除录音成功识别后自动说话处理   

1.0.25   

1.sdk内部去除语音识别后自动说话处理   

1.0.24

1.新增私有化配置支持   

1.0.23   

1.一键构建打包脚本优化  

1.0.22   

1.新增xmpp新增disconnect外抛时间   
2.rtc audio参数新增几个配置项

0.0.45 (暂未发布到npm)

1. 解决监听息屏事件多次触发的问题
2. 解决数字人pause后stop后resume人脸会继续播放的问题
3. 解决数字人stop后resume音频会继续播放的问题
4. 解决在暂停播放情况下 切到后台再回来会直接开始播放

0.0.44

1. 大版本添加鉴权功能
2. 优化测试代码方便测试
3. 优化了一些bug

0.0.43 1.新增从AudioContext获取MediaStream的方法getAudioDest

0.0.42

1. Request.js => getArrayBuffer 添加主动断开请求的方法
2. DigitalHuman.js => _sayVoice 添加判断网络取消时的return
3. DigitalHuman.js => stop 添加cancel方法 防止stop后网络请求才成功导致stop失败

0.0.41

1. Request.js 添加axios超时时间
2. Request.js => getArrayBuffer 添加音频请求失败返回 && DigitalHuman.js => _sayVoice 添加判断 音频请求失败时调用event && DUIX.js => 添加新的事件
   audioFailed 音频请求失败时event

0.0.40

1. 修复bug DigitalHuman.js line:166 & 169 事件名错误导致wsClose wsError不触发的bug
2. 修改webpack配置 默认输出一次sdk版本 方便开发和生产环境的调试

0.0.39

1. 新增暂停(pause)，恢复(resume)方法。
2. 修复偶现的吞字现象。
3. 播放结束不再触发puase事件，只触发ended 事件。
4. 新增功能，页面不可见时暂停画面和声音，恢复可见时继续播放。

0.0.38

1. 修复偶现的调用say方法后，加载卡住，不能播放的bug。
2. 新增功能。当options.body.autoplay=false时，调用say不自动播放静默。

0.0.37

1. 新增 getCanvas() 方法。
2. 新增 getAudioContext() 方法。

0.0.36

1. 修改启动方式,现在以ip形式系统 手机上可以正常访问测试
2. AIFace.js reconnectInterval修改为1 开启断线重连
3. Bug修复 AIFace.js line:48 close => onClose

0.0.34：

1. 新增 wsClose 事件，AIFace 连接关闭事件。
2. 新增 wsError 事件, AIFace 连接错误事件。

0.0.33：

1. 静默视频正放/倒放切换，解决静默首尾不相接（如约旦男）时静默视频跳动的问题。
2. 删除一些调试日志。
3. 修复不触发load事件的bug

0.0.32

1. 修复过短的音频不能触发 canplaythrough 事件的bug。

0.0.31

1. 进一步优化客户端缓冲策略，降低内存占用，现在约旦模型内存占用稳定在700M左右。
2. 修复一些bug

0.0.30

1. 修改客户端缓冲策略，降低客户端内存占用。
2. 新增配置 options.body.autoplay ，用于控制静默视频加载完是否自动播放。默认为true，如置为false，可在 bodyload 事件触发后调用 duix.playSilence() 方法主动播放。
3. 优化TTS缓存方案，现在缓存可以保留更长时间。

0.0.27

1. 新增配置body.autoplay控制身体加载完后是否自动播放。
2. 删除实时贴图的代码，必须走缓冲，缓冲大小可设置为0。
3. 默认缓冲策略修改为auto，由第一次加载人脸的开始半秒加载速度预测缓冲大小。
4. 调整解码间隔时间，降低CPU的瞬间消耗，解决部分手机CPU瞬间占用过高导致页面强行刷新的问题。

0.0.26

1. 修复不传 quality.fps 和 quality.quarter时的报错。

2. 新增bodyprocess事件用于通知身体加载进度。
