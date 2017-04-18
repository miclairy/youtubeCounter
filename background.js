var count = 0;
var limit = -1;
var target = "*://*.youtube.com/watch*"
var currentUrl = "";
var redirectUrl = "http://www.google.co.nz";

chrome.webRequest.onCompleted.addListener(addToCount, {urls: [target]});

function addToCount(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0].url != currentUrl){

            console.log(currentUrl + " " + tabs[0].url);
            currentUrl = tabs[0].url;
            if (count >= limit && limit > -1){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {limitExceeded: true}, function(response) {
                        chrome.tabs.update(tabs[0].id, {url : redirectUrl})
                        });
                });
            }
            count += 1;
            console.log("add one to count " + count + " " + limit);
        }
    });

    console.log(count, limit);

}

function setVideoLimit(numberVideos){
    limit = numberVideos;
}

function setRedirect(url){
    if (url != null){
        redirectUrl = url;
    }
    
}
