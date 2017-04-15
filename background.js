var count = 0;
var limit = -1;
var target = "*://*.youtube.com/watch*"
chrome.webRequest.onCompleted.addListener(addToCount, {urls: [target]})

function addToCount(){
    count += 1;
    console.log(count);
}

function setVideoLimit(numberVideos){
    limit = numberVideos;
    console.log(limit);
}

