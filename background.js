var count = 0;
var limit = -1;
var redirectUrl = "https://www.google.co.nz/"
var off = false;

var target = "*://*.youtube.com/watch*"
var currentUrl = "";


chrome.webRequest.onCompleted.addListener(addToCount, {urls: [target]});

function addToCount(){

    chrome.storage.local.get(["videoLimit", "redirect", "turnedOff"], function(items){
        redirectUrl = items.redirect;
        limit = items.videoLimit;
        off = items.turnedOff;
    });
    console.log(off);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0].url != currentUrl && off == false){

            currentUrl = tabs[0].url;
            if (count >= limit && limit > -1){

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {limitExceeded: true}, function(response) {
                        chrome.tabs.update(tabs[0].id, {url : redirectUrl});
                    });
                });
            } else {
                count += 1;
            }
        }
    });

    console.log(count, limit, redirectUrl);

}

function setVideoLimit(numberVideos){
    limit = numberVideos;
    chrome.storage.local.set({
        videoLimit: numberVideos
    });

}

function setRedirect(url){
    if (url != null){
        redirectUrl = url;
        chrome.storage.local.set({
            redirect: url 
        })
    }
    
}

function turnOff(){
    off = true;
    chrome.storage.local.set({
        turnedOff: true
    });
    console.log(off);
}

function turnOn(){
    off = false;
    chrome.storage.local.set({
        turnedOff: false
    });
}


