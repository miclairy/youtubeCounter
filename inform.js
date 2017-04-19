chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.limitExceeded == true){
        document.getElementsByTagName("video")[0].pause();
        alert("Limit exceeded on videos");
        sendResponse({redirect: true});
    }
      
  });