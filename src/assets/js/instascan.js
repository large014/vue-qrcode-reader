require('babel-polyfill');
require('webrtc-adapter');

var Instascan = {
  Scanner: require('./libs/scanner'),
  Camera: require('./libs/camera')
};

module.exports = Instascan;
