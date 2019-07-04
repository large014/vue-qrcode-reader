# vue-qrcode-reader
モバイルでのQRコードリーダーコンポーネント。  
[DEMO](https://large014.github.io/vue-qrcode-reader/)

## Install
```
./src/components/QRcode.vue をコピー
```

### Usage
```
import QRcode from './components/QRcode.vue'

//--- videoタグを利用するところで、v-cameraswitchのカスタムディレクティブを設定
<QRcode ref="qrcode" @scan-complete="scanComplete($event)" @scan-active="scanActive" @scan-inactive="scanInactive"/>

export default {
  methods:{
    scanComplete(content){
      // contentにスキャン情報が入ってきます
      this.scanData = content;
    },
    scanActive(){
      // console.log('スキャンアクティブ');
    },
    scanInactive(){
      // console.log('スキャンインアクティブ');
    },
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
    }
  }
}
```

[start] QRコードを読み取る準備 / イベントの設定  
[switchCamera] モバイルカメラのフロント / リアの切り替え  
[scanON] スキャン機能開始  
[scanOFF] スキャン機能の停止  


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
