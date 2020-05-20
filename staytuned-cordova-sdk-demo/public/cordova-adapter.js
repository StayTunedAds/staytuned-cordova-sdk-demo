document.addEventListener("deviceready", 
() => {

  window.__stCordovaHook__ = {
    __private__: {
      pending: {
        setSourceUrl: null,
        setCurrentTime: null,
        playPromiseId: null,
        durationSent: false,
        stopMedia: false
      },
      timeUpdateFct: null,
      currentStatus: null,
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
      error: function(err){
        //failure of playback of media object
        console.error(err);

        // if (window.__stCordovaHook__.__private__.pending.playPromiseId && err.code !== 0 && err.code !== 1) {
        //   console.log('reject play promise with id: ' + window.__stCordovaHook__.__private__.pending.playPromiseId);
        //   window.__staytunedGlobal__.staytunedCore.crossStackHandler.rejectPromise(
        //     window.__stCordovaHook__.__private__.pending.playPromiseId,
        //     err
        //   );
        //   window.__stCordovaHook__.__private__.pending.playPromiseId = null;
        // }
      },
      statusChange: function(status){
        console.log('media status is now ' + window.__stCordovaHook__.__private__.status[status] );

        window.__stCordovaHook__.__private__.currentStatus = status;

        // Pending stop media
        if ((status === 2 || status === 3) &&
          window.__stCordovaHook__.__private__.pending.stopMedia &&
          window.__stCordovaHook__.__private__.media) {

          console.log('apply pending stop media');
          window.__stCordovaHook__.__private__.pending.stopMedia = false;
          window.__stCordovaHook__.__private__.media.stop();

          return;
        }
  
        // Pending change current time
        if (status === 2 && window.__stCordovaHook__.__private__.pending.setCurrentTime !== null) {
          console.log('trigger apply current time after status change');
          window.__stCordovaHook__.setCurrentTime({
            currentTime: window.__stCordovaHook__.__private__.pending.setCurrentTime
          });
          window.__stCordovaHook__.__private__.pending.setCurrentTime = null;
        }
  
        // Pending play promise
        if (status === 2 && window.__stCordovaHook__.__private__.pending.playPromiseId) {
          console.log('resolve play promise with id: ' + window.__stCordovaHook__.__private__.pending.playPromiseId);
          window.__staytunedGlobal__.staytunedCore.crossStackHandler.resolvePromise(
            window.__stCordovaHook__.__private__.pending.playPromiseId,
            null
          );
          window.__stCordovaHook__.__private__.pending.playPromiseId = null;
        }
  
        // Emit duration change
        if (status === 2 && !window.__stCordovaHook__.__private__.pending.durationSent) {
          const duration = window.__stCordovaHook__.__private__.media.getDuration();
          console.log('durationchange: ' + duration);

          if (duration > 0) {
            window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
              'durationchange',
              window.__stCordovaHook__.__private__.media.getDuration()
            );
            window.__stCordovaHook__.__private__.pending.durationSent = true;
          }
        }
  
        // Launch timeupdate loop
        if (status === 2 && !window.__stCordovaHook__.__private__.timeUpdateFct) {
          console.log('set time update interval function');
          window.__stCordovaHook__.__private__.timeUpdateFct = setInterval(() => {
            window.__stCordovaHook__.__private__.media.getCurrentPosition(
              (pos) => {
                // console.log('timeupdate: ' + pos);
                window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
                  'timeupdate',
                  pos
                );
              }
            );
          }, 500);
        } else {
          if (status !== 2 && window.__stCordovaHook__.__private__.timeUpdateFct) {
            console.log('clear time update interval function')
            clearInterval(window.__stCordovaHook__.__private__.timeUpdateFct);
            window.__stCordovaHook__.__private__.timeUpdateFct = null;
          }
        }
        
        if (status === 4 && window.__stCordovaHook__.__private__.media) {
          console.log('release current media');
          window.__stCordovaHook__.__private__.media.release();
          window.__stCordovaHook__.__private__.media = null;
          
          console.log('emit end');
          window.__staytunedGlobal__.staytunedCore.crossStackHandler.emit(
            'end'
          );

          if (window.__stCordovaHook__.__private__.pending.setSourceUrl) {
            console.log('create new media')
            window.__stCordovaHook__.__private__.media = new Media(
              window.__stCordovaHook__.__private__.pending.setSourceUrl,
              window.__stCordovaHook__.__private__.success,
              window.__stCordovaHook__.__private__.error,
              window.__stCordovaHook__.__private__.statusChange
            );

            window.__stCordovaHook__.__private__.pending.setSourceUrl = null;
          }
        }
      },
    },
    ready: () => {
      window.__stCordovaHook__.__private__.staytunedReady = true;
    },
    setCurrentTime: (currentTime) => {
      console.log('set current time');
  
      const currentTimeValue = currentTime.currentTime
  
      if (window.__stCordovaHook__.__private__.currentStatus !== 2 &&
        window.__stCordovaHook__.__private__.currentStatus !== 3) {
          console.log('store pending current time: ' + currentTimeValue);
          // Store pending currentTime since the status doesn't allow to seek a position
          window.__stCordovaHook__.__private__.pending.setCurrentTime = currentTimeValue;
      } else {
        console.log('apply current time: ' + currentTimeValue);
        window.__stCordovaHook__.__private__.media.seekTo(currentTimeValue * 1000);
      }
    },
    play: (promiseId) => {
      console.log('play received with promiseId: ' + promiseId.promiseId);
      window.__stCordovaHook__.__private__.pending.playPromiseId = promiseId.promiseId;
      window.__stCordovaHook__.__private__.media.play();
    },
    pause: () => {
      window.__stCordovaHook__.__private__.media.pause();
    },
    setSource: (source) => {
      console.log('set source received: ' + source.source.url);

      // Reset
      window.__stCordovaHook__.__private__.pending = {
        setSourceUrl: null,
        setCurrentTime: null,
        playPromiseId: null,
        durationSent: false,
        stopMedia: false
      }

      if (window.__stCordovaHook__.__private__.media) {
        console.log('stop current media');
        window.__stCordovaHook__.__private__.pending.setSourceUrl = source.source.url;

        if (window.__stCordovaHook__.__private__.currentStatus === 2 ||
          window.__stCordovaHook__.__private__.currentStatus === 3) {
          console.log('current media stopped');
          window.__stCordovaHook__.__private__.media.stop();
        } else {
          console.log('store pending current media stop request');
          window.__stCordovaHook__.__private__.pending.stopMedia = true;
        }
      } else {
        console.log('create new media')
        window.__stCordovaHook__.__private__.media = new Media(
          source.source.url,
          window.__stCordovaHook__.__private__.success,
          window.__stCordovaHook__.__private__.error,
          (status) => { window.__stCordovaHook__.__private__.statusChange(status, source.source.url); }
        );
      }
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
