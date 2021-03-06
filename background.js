let count = 0;
let limit = 1;
let redirectUrl = "https://en.wikipedia.org/wiki/Procrastination";
let off = false;
let lastVideoUrl = "";
const youtubeUrl = '*://*.youtube.com/watch*';

async function addToCount(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const items = await browser.storage.local.get(["videoLimit", "redirect", "turnedOff"]);
        redirectUrl = items.redirect || redirectUrl;
        limit = items.videoLimit || limit;
        off = items.turnedOff || off;
        
        if (!off && changeInfo.url !== lastVideoUrl) {
            if (count >= limit && limit > -1) {
                await browser.tabs.sendMessage(tabId, {limitExceeded: true});
                await browser.tabs.update(tabId, {url: redirectUrl});
            } else {
                lastVideoUrl = changeInfo.url;
                count += 1;
            }
        }
    }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "GET:count") {
        sendResponse({count: count});
    }
});

browser.tabs.onUpdated.addListener(addToCount, {urls: [youtubeUrl]});

function setVideoLimit(numberVideos){
    limit = numberVideos;
    browser.storage.local.set({
        videoLimit: numberVideos
    });
}

function setRedirect(url){
    if (url != null){
        redirectUrl = url;
        browser.storage.local.set({
            redirect: url 
        })
    }
}

function turnOff(){
    off = true;
    browser.storage.local.set({
        turnedOff: true
    });
}

function turnOn(){
    off = false;
    browser.storage.local.set({
        turnedOff: false
    });
}
