var count = -1;
var limit = -1;
var target = "*://*.youtube.com/watch*"
var currentUrl = "";

chrome.webRequest.onCompleted.addListener(addToCount, {urls: [target]});

function addToCount(){

    
    var add = true;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0].url === currentUrl){
            add = false;
            
        }
        console.log(currentUrl, tabs[0].url + " " + add)
        currentUrl = tabs[0].url;
    });
    
    if (add == true){
        count += 1;
        console.log(count, limit);

        if (count >= limit && limit > -1){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {limitExceeded: true}, function(response) {
                    chrome.tabs.update(tabs[0].id, {url : "http://www.google.co.nz"})
                    });
            });
        }
    }
}

function setVideoLimit(numberVideos){
    limit = numberVideos;
}
