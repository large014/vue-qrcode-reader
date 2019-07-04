<template>
  <div id="app">
    <QRcode ref="qrcode" @scan-complete="scanComplete($event)" @scan-active="scanActive" @scan-inactive="scanInactive"/>
    <div class="ui">
      <button @click="cameraStart" class="startBtn" :class="{on:!isQrsetting}">スタート</button>
      <button @click="cameraSwtich" :class="{on:isQrsetting}">カメラスイッチ</button>
      <button @click="cameraOFF" :class="{on:isQrsetting}">カメラOFF</button>
      <button @click="cameraON" :class="{on:isQrsetting}">カメラON</button>
      <button @click="scanRset" :class="{on:isQrsetting}">リセット</button>
    </div>
    <p :class="{on:isScan}">{{scanData}}</p>
  </div>
</template>

<script>
import QRcode from './components/QRcode.vue'

export default {
  name: 'app',
  components: {
    QRcode
  },
  data(){
    return{
      scanData:String,
      isScan :false,
      isQrsetting : false
    }
  },
  mounted(){
  },
  methods:{
    cameraStart(){
      this.isQrsetting = true;
      this.$refs.qrcode.start();
    },
    cameraSwtich(){
      this.isScan = false;
      this.$refs.qrcode.switchCamera();
    },
    cameraOFF(){
      this.isScan = false;
      this.$refs.qrcode.scanOFF();
    },
    cameraON(){
      this.$refs.qrcode.scanON();
    },
    scanRset(){
      this.isScan = false;
    },
    scanComplete(content){
      this.scanData = content;
      this.isScan = true;
    },
    scanActive(){
      // console.log('スキャンアクティブ');
    },
    scanInactive(){
      // console.log('スキャンインアクティブ');
    }
  }
}
</script>

<style scoped lang="scss">
#app{
  position: relative;
  height: 100vh;
}
.ui{
  position: absolute;
  top: 20px;
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
button{
  // position: absolute;
  // top: 20px;
  border: 1px solid #000;
  border-radius: 3px;
  background-color: #ccc;
  font-size: 15px;
  padding: 10px 6px;
  margin: 3px;
  letter-spacing: -1px;
  display: none;
  &.on{
    display: inline-block
  }
}
p{
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%,0%);
  z-index: 3;
  width: 300px;
  background-color: rgba(200, 200, 200, 0.5);
  border: 1px solid #000;
  padding: 10px;
  word-wrap: break-word;
  display: none;
  &.on{
    display: block;
  }
}
.startBtn{
  display: none;
  &.on{
    display: inline-block
  }
}
</style>
