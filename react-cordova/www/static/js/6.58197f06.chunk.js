(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[6],{35:function(t,n,e){"use strict";e.r(n),e.d(n,"st_track_detail",(function(){return s}));var r=e(6),i=e(7),o=e(14),a=e(36),c=e(37),s=function(){function t(n){var e=this;Object(r.a)(this,t),Object(o.d)(this,n),this.currentTrack=void 0,this.playingTrack=void 0,this.playingState=void 0,this.playTrack=function(){var t,n;(null===(t=e.currentTrack)||void 0===t?void 0:t.key)==(null===(n=e.playingTrack)||void 0===n?void 0:n.key)?a.a.getInstance().resume():a.a.getInstance().playTrack(e.currentTrack)},this.stop=function(){a.a.getInstance().stop()}}return Object(i.a)(t,[{key:"componentWillRender",value:function(){var t=this;this.currentTrack=Object.assign(new c.a,JSON.parse(this.data)),this.trackObserver=a.a.getInstance().observeCurrentTrack((function(n){t.playingTrack=n})),this.stateObserver=a.a.getInstance().observeCurrentState((function(n){t.playingState=n}))}},{key:"disconnectedCallback",value:function(){a.a.getInstance().removeTrackObserver(this.trackObserver),a.a.getInstance().removeStateObserver(this.stateObserver)}},{key:"render",value:function(){var t,n,e,r,i,a=Object(o.b)("div",{class:"content-play",onClick:this.playTrack},"Commencer la lecture");if((null===(t=this.currentTrack)||void 0===t?void 0:t.key)==(null===(n=this.playingTrack)||void 0===n?void 0:n.key)&&(a="Playing"==this.playingState?Object(o.b)("div",{class:"content-play inline",onClick:this.stop},"Mettre en pause"):Object(o.b)("div",{class:"content-play",onClick:this.playTrack},"Reprendre la lecture")),this)return Object(o.b)("div",null,Object(o.b)("img",{class:"content-img",src:null===(e=this.currentTrack)||void 0===e?void 0:e.imgSrc}),Object(o.b)("div",{class:"content-title"},null===(r=this.currentTrack)||void 0===r?void 0:r.title),a,Object(o.b)("div",{class:"content-description",innerHTML:null===(i=this.currentTrack)||void 0===i?void 0:i.descriptionText}))}}]),t}();s.style=".content-img{width:180px;height:180px;margin:auto;display:block;margin-top:32px;background:#ddd;border-radius:16px;margin-bottom:16px}.content-title{display:block;font-weight:bold;text-align:center;margin:8px 32px;font-size:18px}.content-author{display:block;text-align:center;margin:4px 32px}.content-description{margin:24px;text-align:justify}.content-play{display:block;margin:auto;max-width:400px;background:#2777ff;border:solid 2px #2777ff;margin:16px 32px;padding:12px;border-radius:8px;color:white;text-align:center;cursor:pointer;font-weight:bold}.content-play.inline{background:white;color:#2777ff}.content-track{display:flex;align-items:center;justify-items:center;padding:16px}.content-track:active{background:#ddd}.content-track-img{width:64px;height:64px;margin-right:16px}.content-track-is-playing{font-size:14px;color:#2777ff}"},36:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var r=function(t,n,e,r){return new(e||(e=Promise))((function(i,o){function a(t){try{s(r.next(t))}catch(n){o(n)}}function c(t){try{s(r.throw(t))}catch(n){o(n)}}function s(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,c)}s((r=r.apply(t,n||[])).next())}))},i=function(t,n){var e,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=n.call(t,a)}catch(c){o=[6,c],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},o=function(){function t(){var t=this;this.staytunedPlugin=window.Staytuned,this.trackObservers=[],this.contentObservers=[],this.timeObservers=[],this.stateObservers=[],this.staytunedPlugin.player.getCurrentTrack((function(n){"OK"==n&&(n=void 0),t.trackObservers.forEach((function(t){t.onChange(n)}))}),(function(t){})),this.staytunedPlugin.player.getCurrentContent((function(n){"OK"==n&&(n=void 0),t.contentObservers.forEach((function(t){t.onChange(n)}))}),(function(t){})),this.staytunedPlugin.player.getCurrentTime((function(n){t.timeObservers.forEach((function(t){t.onChange(n)}))}),(function(){})),this.staytunedPlugin.player.getCurrentState((function(n){"OK"==n&&(n=void 0),t.stateObservers.forEach((function(t){t.onChange(n)}))}),(function(){}))}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.launchUI=function(){return r(this,void 0,void 0,(function(){var t=this;return i(this,(function(n){return[2,new Promise((function(n,e){t.staytunedPlugin.player.launchUI((function(){n()}),(function(t){e(t)}))}))]}))}))},t.prototype.playTrack=function(t){var n=this;return new Promise((function(e,r){n.staytunedPlugin.player.playTrack(t,(function(){e()}),(function(t){r(t)}))}))},t.prototype.resume=function(){return r(this,void 0,void 0,(function(){var t=this;return i(this,(function(n){return[2,new Promise((function(n,e){t.staytunedPlugin.player.resume((function(){n()}),(function(t){e(t)}))}))]}))}))},t.prototype.stop=function(){return r(this,void 0,void 0,(function(){var t=this;return i(this,(function(n){return[2,new Promise((function(n,e){t.staytunedPlugin.player.stop((function(){n()}),(function(t){e(t)}))}))]}))}))},t.prototype.observeCurrentTrack=function(t){var n=new a(t);return this.trackObservers.push(n),n},t.prototype.observeCurrentContent=function(t){var n=new a(t);return this.contentObservers.push(n),n},t.prototype.observeCurrentTime=function(t){var n=new a(t);return this.timeObservers.push(n),n},t.prototype.observeCurrentState=function(t){var n=new a(t);return this.stateObservers.push(n),n},t.prototype.removeTrackObserver=function(t){this.removeObserver(this.trackObservers,t)},t.prototype.removeContentObserver=function(t){this.removeObserver(this.contentObservers,t)},t.prototype.removeTimeObserver=function(t){this.removeObserver(this.timeObservers,t)},t.prototype.removeStateObserver=function(t){this.removeObserver(this.stateObservers,t)},t.prototype.removeObserver=function(t,n){var e=t.findIndex((function(t){return t.id==n.id}));e>=0&&t.splice(e,1)},t}(),a=function(t){this.onChange=t,this.id=Math.floor(1e9*Math.random())}},37:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var r=function(){}}}]);
//# sourceMappingURL=6.58197f06.chunk.js.map