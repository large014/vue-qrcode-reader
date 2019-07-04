<template>
  <div class="qrwrappear">
    <video ref="preview" id="preview" playsinline muted autoplay class="active" :class="{rear:isRear}"></video>
  </div>
</template>

<script>
import Instascan from 'instascan/index'
// import Instascan from '@/assets/js/instascan';

Instascan.Camera.prototype.start =
  async function() {
    console.log('camera : start = ' + this.id + ", name = " + this.name );
    let constraints;
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
      if (this.name == "前面側カメラ") {
        this.cameraType = 'user';
        console.log('前面');
      } else {
        this.cameraType = "environment";
      }

      constraints = {
        audio: false,
        video: {
          // facingMode: 'environment',
          facingMode: this.cameraType,
          mandatory: {
            sourceId: this.id,
            minWidth: 600,
            maxWidth: 800,
            minAspectRatio: 1.6
          },
          optional: []
        }
      };
    } else {
      constraints = {
        audio: false,
        video: {
          mandatory: {
            sourceId: this.id,
            minWidth: 600,
            maxWidth: 800,
            minAspectRatio: 1.6
          },
          optional: []
        }
      };
    }
    this._stream = await Instascan.Camera._wrapErrors(async () => {
      return await navigator.mediaDevices.getUserMedia(constraints);
    });

    return this._stream;
  }

Instascan.Scanner.prototype._enableScan =
async function(camera) {
      this._camera = camera || this._camera;
    if (!this._camera) {
      throw new Error('Camera is not defined.');
    }
    console.log('scanner.js : camera.start');

    let stream = await this._camera.start();
    this.video.srcObject = stream;

    if (this._continuous) {
      this._scanner.start();
    }
}


export default {
  name: 'QRcode',
  props: {
    msg: String
  },
  data(){
    return {
      scanner: null,
      activeCameraId: null,
      scanData:String,
      cameraIndex:0,
      cameras: [],
      scans: [],
      cameraID:[],
      isRear:false
    }
  },
  mounted(){
      // let self = this;
      // this.scanner = new Instascan.Scanner({ video: document.getElementById('preview'),mirror: false });
      // this.scanner.addListener('scan', function (content) {
      //   self.$emit('scan-complete', content);
      // });
      // this.scanner.addListener('active', function () {
      //   self.$emit('scan-active');
      // });
      // this.scanner.addListener('inactive', function () {
      //   self.$emit('scan-inactive');
      // });
      // Instascan.Camera.getCameras().then(function (cameras) {
      //   self.cameras = cameras;
      //   // console.log(cameras);
      //   for (let index = 0; index < cameras.length; index++) {
      //     console.log('cameras.id = ' + cameras[index].id + ", name = " + cameras[index].name);
      //   }

      //   if (cameras.length > 0) {
      //     self.activeCameraId = cameras[0].id;
      //     console.log('QRcode : start call');
      //     self.scanner.start(cameras[0]);
      //   } else {
      //     console.error('No cameras found.');
      //   }
      // }).catch(function (e) {
      //   console.error(e);
      // });
  },
  destroyed(){
      this.scanner.removeEventListener('scan', this.scanComplete);
      this.scanner.removeEventListener('active', this.scanActive);
      this.scanner.removeEventListener('inactive', this.scanInactive);
  },
  methods:{
    start(){
      let self = this;
      this.scanner = new Instascan.Scanner({ video: document.getElementById('preview'),mirror: false });

      this.scanner.addListener('scan', this.scanComplete);
      this.scanner.addListener('active', this.scanActive);
      this.scanner.addListener('inactive', this.scanInactive);

      // this.scanner.addListener('active', function () {
      //   self.$emit('scan-active');
      // });
      // this.scanner.addListener('inactive', function () {
      //   self.$emit('scan-inactive');
      // });
      Instascan.Camera.getCameras().then(function (cameras) {
        self.cameras = cameras;
        // console.log(cameras);
        for (let index = 0; index < cameras.length; index++) {
          console.log('cameras.id = ' + cameras[index].id + ", name = " + cameras[index].name);
        }

        if (cameras.length > 0) {
          self.activeCameraId = cameras[0].id;
          console.log('QRcode : start call');
          self.scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    },
    scanComplete(content){
      this.$emit('scan-complete', content);
    },
    scanActive(){
      this.$emit('scan-active');
    },
    scanInactive(){
      this.$emit('scan-inactive');
    },
    switchCamera(){
      if(this.cameras.length <= 1){
        return;
      }
      // this.cameraIndex = (this.cameraIndex == 0) ? this.cameraIndex =1 : this.cameraIndex = 0;

      if(this.cameraIndex == 0){
        this.cameraIndex =1;
        isRear = true;
      } else {
        this.cameraIndex = 0;
        isRear = false;
      }

      this.activeCameraId = this.cameras[this.cameraIndex].id;
      this.scanner.start(this.cameras[this.cameraIndex]);
      // this.activeCameraId = camera.id;
      // this.scanner.start(camera);
    },
    scanOFF(){
      this.scanner.stop();
    },
    scanON(){
      this.scanner.start(this.cameras[this.cameraIndex]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.qrwrappear{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#preview{
  position: absolute;
}
@media (aspect-ratio: 16/9), (min-aspect-ratio: 16/9) {
  #preview {
    width: 100%;
    /* top: 50%; */
    /* transform: translateX(-50%) scaleX(-1); */
    transform: scaleX(-1);
    &.rear{
      transform: scaleX(1);
    }
  }
}
@media (max-aspect-ratio: 16/9) {
  #preview {
    height: 100%;
    left: 50%;
    transform: translateX(-50%) scaleX(-1);
    &.rear{
      transform: translateX(-50%) scaleX(-1);
    }
  }
}

</style>
