<template>
  <div class="qrwrappear">
    <video ref="preview" id="preview" playsinline muted autoplay class="active"></video>
  </div>
</template>

<script>
// import Instascan from 'instascan/index'
import Instascan from '@/assets/js/instascan';


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
    }
  },
  mounted(){
      let self = this;
      this.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      this.scanner.addListener('scan', function (content) {
        self.$emit('scan-complete', content);
      });
      this.scanner.addListener('active', function () {
        self.$emit('scan-active');
      });
      this.scanner.addListener('inactive', function () {
        self.$emit('scan-inactive');
      });
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
  methods:{
    switchCamera(){
      this.cameraIndex = (this.cameraIndex == 0) ? this.cameraIndex =1 : this.cameraIndex = 0;
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
      transform: scaleX(1);
    }
  }
}

</style>
