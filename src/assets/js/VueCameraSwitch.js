
let VueCameraSwitch = {};

VueCameraSwitch.install = function (Vue, options) {
    let videoElement;
    let selectors = ["audioInputSelect", "audioOutputSelect", "videoSelect"];
    let videoDevices = [];
    Vue.directive('cameraswitch', {
        //--- ディレクティブが初めて対象の要素にひも付いた時
        bind: (el, binding) => {
            // console.log(binding);
        },
        //--- ひも付いている要素が親 Node に挿入された時
        inserted: (el, binding) => {
            // el.focus()
            console.log('inserted : = ' + binding.value);
            videoElement = el;
            navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
            start(binding.value);
        },
        update: (el, binding) => {
            // binding.value = 1
            console.log('update : = ' + binding.value);
            start(binding.value);
        },
        //--- ディレクティブがひも付いている要素から取り除かれた時
        unbind: (el, binding) => {
            console.log('unbind : = ' + binding);
        }
    })

    function gotDevices(deviceInfos){
        for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            // console.log('deviceInfo.kind = ' + deviceInfo.kind);
            if (deviceInfo.kind === 'videoinput') {
                let device = deviceInfo.label || `camera`;
                videoDevices.push(deviceInfo.deviceId)
                // console.log('deviceid = ' + deviceInfo.deviceId);
            }
        }
        // console.log(videoDevices);
        // console.log('----------');
    }
    function handleError() {
        console.log('Error : Unable to get device.');
    }

    function start(value) {
        const audioSource = "audioInputSelect.value";
        const videoSource = videoDevices[ value ];
        // console.log('videoSource = ' + videoSource);
        let constraints = {
            video: { deviceId: videoSource }
        }
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia;
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
            if ("srcObject" in videoElement) {
                videoElement.srcObject = stream;
            } else {
                videoElement.src = (window.URL && stream);
            }
            window.stream = stream;
            videoElement.onloadedmetadata = () => {
                console.log('videostart');
                videoElement.play();
            }

        }).catch(function (err) {
            console.log(err);
        });
    }
}

export default VueCameraSwitch;