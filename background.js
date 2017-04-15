var count = 0;
var limit = -1;
var target = "*://*.youtube.com/watch*"
chrome.webRequest.onCompleted.addListener(addToCount, {urls: [target]})

function addToCount(){
    count += 1;
    console.log(count, limit);
    if (count - 1 > limit && limit > -1){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {limitExceeded: true}, function(response) {
            console.log(response.farewell);
        });
        });
    }
}

function setVideoLimit(numberVideos){
    limit = numberVideos;
}

