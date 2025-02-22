/// <reference lib="webworker" />

// needed to prevent page freeze after time
addEventListener('message', ({ data }) => {
  if (data === 'start') {
    setInterval(function(){
      postMessage('');
    }, 1000);
  }
});
