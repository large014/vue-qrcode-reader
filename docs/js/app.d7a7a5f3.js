(function(e){function t(t){for(var a,c,i=t[0],o=t[1],u=t[2],m=0,l=[];m<i.length;m++)c=i[m],r[c]&&l.push(r[c][0]),r[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);d&&d(t);while(l.length)l.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==r[o]&&(a=!1)}a&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},s=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var d=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("QRcode",{ref:"qrcode",on:{"scan-complete":function(t){return e.scanComplete(t)},"scan-active":e.scanActive,"scan-inactive":e.scanInactive}}),n("div",{staticClass:"ui"},[n("button",{staticClass:"startBtn",class:{on:!e.isQrsetting},on:{click:e.cameraStart}},[e._v("スタート")]),n("button",{class:{on:e.isQrsetting},on:{click:e.cameraSwtich}},[e._v("カメラスイッチ")]),n("button",{class:{on:e.isQrsetting},on:{click:e.cameraOFF}},[e._v("カメラOFF")]),n("button",{class:{on:e.isQrsetting},on:{click:e.cameraON}},[e._v("カメラON")]),n("button",{class:{on:e.isQrsetting},on:{click:e.scanRset}},[e._v("リセット")])]),n("p",{class:{on:e.isScan}},[e._v(e._s(e.scanData))])],1)},s=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"qrwrappear"},[n("video",{ref:"preview",staticClass:"active",class:{rear:e.isRear},attrs:{id:"preview",playsinline:"",muted:"",autoplay:""},domProps:{muted:!0}})])},i=[],o=(n("7f7f"),n("96cf"),n("3b8d")),u=n("427d"),d=n.n(u);d.a.Camera.prototype.start=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("camera : start = "+this.id+", name = "+this.name),n=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,n?("前面側カメラ"==this.name?(this.cameraType="user",console.log("前面")):this.cameraType="environment",t={audio:!1,video:{facingMode:this.cameraType,mandatory:{sourceId:this.id,minWidth:600,maxWidth:800,minAspectRatio:1.6},optional:[]}}):t={audio:!1,video:{mandatory:{sourceId:this.id,minWidth:600,maxWidth:800,minAspectRatio:1.6},optional:[]}},e.next=5,d.a.Camera._wrapErrors(Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})));case 5:return this._stream=e.sent,e.abrupt("return",this._stream);case 7:case"end":return e.stop()}},e,this)})),d.a.Scanner.prototype._enableScan=function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this._camera=t||this._camera,this._camera){e.next=3;break}throw new Error("Camera is not defined.");case 3:return console.log("scanner.js : camera.start"),e.next=6,this._camera.start();case 6:n=e.sent,this.video.srcObject=n,this._continuous&&this._scanner.start();case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();var m={name:"QRcode",props:{msg:String},data:function(){return{scanner:null,activeCameraId:null,scanData:String,cameraIndex:0,cameras:[],scans:[],cameraID:[],isRear:!0}},mounted:function(){},destroyed:function(){this.scanner.removeEventListener("scan",this.scanComplete),this.scanner.removeEventListener("active",this.scanActive),this.scanner.removeEventListener("inactive",this.scanInactive)},methods:{start:function(){var e=this;this.scanner=new d.a.Scanner({video:document.getElementById("preview"),mirror:!1}),this.scanner.addListener("scan",this.scanComplete),this.scanner.addListener("active",this.scanActive),this.scanner.addListener("inactive",this.scanInactive),d.a.Camera.getCameras().then(function(t){e.cameras=t;for(var n=0;n<t.length;n++)console.log("cameras.id = "+t[n].id+", name = "+t[n].name);t.length>0?(e.activeCameraId=t[0].id,console.log("QRcode : start call"),e.scanner.start(t[0])):console.error("No cameras found.")}).catch(function(e){console.error(e)})},scanComplete:function(e){this.$emit("scan-complete",e)},scanActive:function(){this.$emit("scan-active")},scanInactive:function(){this.$emit("scan-inactive")},switchCamera:function(){console.log("this.cameras.length = "+this.cameras.length),this.cameras.length<=1||(0==this.cameraIndex?(this.cameraIndex=1,isRear=!1):(this.cameraIndex=0,isRear=!0),this.activeCameraId=this.cameras[this.cameraIndex].id,this.scanner.start(this.cameras[this.cameraIndex]))},scanOFF:function(){this.scanner.stop()},scanON:function(){this.scanner.start(this.cameras[this.cameraIndex])}}},l=m,h=(n("cbd5"),n("2877")),f=Object(h["a"])(l,c,i,!1,null,"6c5d0054",null),p=f.exports,v={name:"app",components:{QRcode:p},data:function(){return{scanData:String,isScan:!1,isQrsetting:!1}},mounted:function(){},methods:{cameraStart:function(){this.isQrsetting=!0,this.$refs.qrcode.start()},cameraSwtich:function(){this.isScan=!1,this.$refs.qrcode.switchCamera()},cameraOFF:function(){this.isScan=!1,this.$refs.qrcode.scanOFF()},cameraON:function(){this.$refs.qrcode.scanON()},scanRset:function(){this.isScan=!1},scanComplete:function(e){this.scanData=e,this.isScan=!0},scanActive:function(){},scanInactive:function(){}}},g=v,b=(n("7c5d"),Object(h["a"])(g,r,s,!1,null,"33dda637",null)),w=b.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(w)}}).$mount("#app")},"5f9c":function(e,t,n){},"7c5d":function(e,t,n){"use strict";var a=n("c7c5"),r=n.n(a);r.a},c7c5:function(e,t,n){},cbd5:function(e,t,n){"use strict";var a=n("5f9c"),r=n.n(a);r.a}});
//# sourceMappingURL=app.d7a7a5f3.js.map