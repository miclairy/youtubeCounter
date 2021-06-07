let count = 0;
let limit = -1;
let redirectUrl = "https://www.google.co.nz/";
let off = false;
let lastVideoUrl = "";

async function addToCount(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const items = await browser.storage.local.get(["videoLimit", "redirect", "turnedOff"]);
        redirectUrl = items.redirect;
        limit = items.videoLimit;
        off = items.turnedOff;
        
        console.log(`lastVideoUrl: ${lastVideoUrl}`);
        console.log(`changeInfo.url: ${changeInfo.url}`);
        console.log(`count: ${count}/${limit}`);
        
        if (changeInfo.url !== lastVideoUrl) {
            lastVideoUrl = changeInfo.url;
            if (count >= limit && limit > -1) {
                await browser.tabs.sendMessage(tabId, {limitExceeded: true});
                await browser.tabs.update(tabId, {url: redirectUrl});
            } else {
                count += 1;
            }
        }
    }
}

browser.tabs.onUpdated.addListener(addToCount, {urls: ['*://*.youtube.com/watch*']});

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
