/// <reference lib="webworker" />

// needed to prevent page freeze after time
addEventListener('message', ({ data }) => {
  let interval
  if (data === 'start') {
    interval = setInterval(function(){
      postMessage('');
    }, 1000);
  } else if (data === 'stop') {
    clearInterval(interval)
  }
});
