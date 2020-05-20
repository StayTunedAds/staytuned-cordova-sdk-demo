document.addEventListener("deviceready", 
() => {

  window.__stCordovaHook__ = {
    __private__: {
      mediaList: {},
      currentMediaUrl: null,
      status: {
        '0': 'MEDIA_NONE',
        '1': 'MEDIA_STARTING',
        '2': 'MEDIA_RUNNING',
        '3': 'MEDIA_PAUSED',
        '4': 'MEDIA_STOPPED'
      },
      err: {
          '0': 'MEDIA_ERR_NONE_ACTIVE',
          '1': 'MEDIA_ERR_ABORTED',
          '2': 'MEDIA_ERR_NETWORK',
          '3': 'MEDIA_ERR_DECODE',
          '4': 'MEDIA_ERR_NONE_SUPPORTED'
      },
      staytunedReady: false,
      media: null,
      success: function(){
        // success creating the media object and playing, stopping, or recording
        // console.log('success');
      },
      error: function(err, url){
        //failure of playback of media object
        // console.error(err);

        if (window.__stCordovaHook__.__private__.mediaList[url].playPromiseId) {
          window.__staytunedGlobal__.staytunedCore.crossStackHandler.rejectPromise(
            window.__stCordovaHook__.__private__.mediaList[url].playPromiseId,
            { 
              name: 'CordovaSdkError',
              err: err
            }
          );
          window.__stCordovaHook__.__private__.mediaList[url].playPromiseId = null;
        }
      },
      statusChange: function(status, url){

        if (!window.__stCordovaHook__.__private__.mediaList[url]) {
          return;
        }

        // console.log(`(${url}) status change: ${window.__stCordovaHook__.__private__.status[status]}`);
        window.__stCordovaHook__.__private__.mediaList[url].currentStatus = status;

        // Pending play promise
        if (status === 2 && window.__stCordovaHook__.__private__.mediaList[url].playPromiseId) {
          // console.log(`(${url}) resolve play promise ${window.__stCordovaHook__.__private__.mediaList[url].playPromiseId}`);
          window.__staytunedGlobal__.staytunedCore.crossStackHandler.resolvePromise(
            window.__stCordovaHook__.__private__.mediaList[url].playPromiseId,
            null
          );
          window.__stCordovaHook__.__private__.mediaList[url].playPromiseId = null;
        }
  
        // Pending change current time
        if (status === 2 && window.__stCordovaHook__.__private__.mediaList[url].pendingCurrentTime !== null) {
          // console.log(`(${url}) pending current time set to ${window.__stCordovaHook__.__private__.mediaList[url].pendingCurrentTime}`);
          window.__stCordovaHook__.setCurrentTime({
            currentTime: window.__stCordovaHook__.__private__.mediaList[url].pendingCurrentTime
          });
          window.__stCordovaHook__.__private__.mediaList[url].pendingCurrentTime = null;
        }
  
        // Emit duration change
        if (status === 2 && !window.__stCordovaHook__.__private__.mediaList[url].durationSent) {
          const duration = window.__stCordovaHook__.__private__.mediaList[url].media.getDuration();

          if (duration > 0) {
            // console.log(`(${url}) emit durationchange(${duration})`);
            window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
              'durationchange',
              duration
            );
            window.__stCordovaHook__.__private__.mediaList[url].durationSent = true;
          } else {
            // console.log(`(${url}) /!\\ not emitted durationchange(${duration})`);
          }
        }
  
        // Launch timeupdate loop
        if (status === 2 && !window.__stCordovaHook__.__private__.mediaList[url].timeUpdateFct) {
          // console.log(`(${url}) set time update interval function`);
          window.__stCordovaHook__.__private__.mediaList[url].timeUpdateFct = setInterval(() => {
            window.__stCordovaHook__.__private__.mediaList[url].media.getCurrentPosition(
              (pos) => {
                // // console.log(`(${url}) timeupdate(${pos})`);
                window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
                  'timeupdate',
                  pos
                );
              }
            );
          }, 500);
        } else {
          if (status !== 2 && window.__stCordovaHook__.__private__.mediaList[url].timeUpdateFct) {
            // console.log(`(${url}) clear time update interval function`)
            clearInterval(window.__stCordovaHook__.__private__.mediaList[url].timeUpdateFct);
            window.__stCordovaHook__.__private__.mediaList[url].timeUpdateFct = null;
          }
        }
        
        if (status === 4 && window.__stCordovaHook__.__private__.mediaList[url].media) {
          // console.log(`(${url}) release current media`);
          window.__stCordovaHook__.__private__.mediaList[url].media.release();
          
          if (window.__stCordovaHook__.__private__.currentMediaUrl === url) {
            // console.log(`(${url}) emit end`);
            window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
              'end'
            );
          }
        }

        if (status === 4) {
          delete window.__stCordovaHook__.__private__.mediaList[url];
        }
      },
    },
    ready: () => {
      window.__stCordovaHook__.__private__.staytunedReady = true;
    },
    setCurrentTime: (currentTime) => {
      // console.log(`received setCurrentTime(${currentTime.currentTime})`);
  
      const currentTimeValue = currentTime.currentTime;
      const currentMedia = window.__stCordovaHook__.__private__.mediaList[window.__stCordovaHook__.__private__.currentMediaUrl];
  
      if (currentMedia) {
        if (currentMedia.currentStatus !== 2 && currentMedia.currentStatus !== 3) {
          // console.log(`store pending current time: ${currentTimeValue}`);
          // Store pending currentTime since the status doesn't allow to seek a position
          window.__stCordovaHook__.__private__.mediaList[
            window.__stCordovaHook__.__private__.currentMediaUrl
          ].pendingCurrentTime = currentTimeValue;
        } else {
          // console.log('apply current time: ' + currentTimeValue);
          window.__stCordovaHook__.__private__.mediaList[
            window.__stCordovaHook__.__private__.currentMediaUrl
          ].media.seekTo(currentTimeValue * 1000);
        }
      } 
    },
    play: (promiseId) => {
      // console.log(`play received ${promiseId.promiseId}`);

      window.__stCordovaHook__.__private__.mediaList[
        window.__stCordovaHook__.__private__.currentMediaUrl
      ].playPromiseId = promiseId.promiseId;

      window.__stCordovaHook__.__private__.mediaList[
        window.__stCordovaHook__.__private__.currentMediaUrl
      ].media.play();
    },
    pause: () => {
      window.__stCordovaHook__.__private__.mediaList[
        window.__stCordovaHook__.__private__.currentMediaUrl
      ].media.pause();
    },
    setSource: (source) => {
      // console.log(`setSource(${source.source.url})`);

      if (window.__stCordovaHook__.__private__.mediaList[source.source.url]) {
        return;
      }

      Object.keys(window.__stCordovaHook__.__private__.mediaList)
      .filter(mUrl => mUrl !== source.source.url)
      .map(mUrl => {
        if (window.__stCordovaHook__.__private__.mediaList[mUrl].media){ 
          // console.log(`stop audio ${mUrl}`);
          if (window.cordova.platformId  === 'android') {
            window.__stCordovaHook__.__private__.mediaList[mUrl].media.stop();
          }
        }
      });

      // Set values to default
      window.__stCordovaHook__.__private__.mediaList[source.source.url] = {
        url: source.source.url,
        pendingCurrentTime: null,
        playPromiseId: null,
        durationSent: false,
        timeUpdateFct: null,
        currentStatus: null,
        media: null
      }

      window.__stCordovaHook__.__private__.currentMediaUrl = source.source.url;

      // console.log(`create new media ${source.source.url}`);

      window.__stCordovaHook__.__private__.mediaList[source.source.url].media = new Media(
        source.source.url,
        window.__stCordovaHook__.__private__.success,
        (err) => { window.__stCordovaHook__.__private__.error(err, source.source.url); },
        (status) => { window.__stCordovaHook__.__private__.statusChange(status, source.source.url); }
      );
    },
    stateUpdate: (state)=> {},
    setVolume: (volume)=> {},
    downloadOfflineElement: (element)=> {},
    removeOfflineElement: (element)=> {},
    readFile: (readFilePromise)=> {},
    writeFile: (writeFile)=> {},
    sendStatusCode: (statusCode)=> {},
    sendNotification: (notification)=> {},
  };

}, false);
