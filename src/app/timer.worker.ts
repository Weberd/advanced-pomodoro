/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data === 'start') {
    setInterval(function(){
      postMessage('');
    }, 1000);
  }
});
