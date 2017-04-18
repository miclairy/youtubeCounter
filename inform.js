chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.limitExceeded == true){
        alert("Limit exceeded on videos");
        sendResponse({redirect: true});
    }
      
  });