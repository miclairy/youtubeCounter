let count = 0;
let limit = -1;
let redirectUrl = "https://www.google.co.nz/";
let off = false;
let lastVideoUrl = "";

const target = "*://*.youtube.com/watch*";

async function addToCount() {
    const items = await browser.storage.local.get(["videoLimit", "redirect", "turnedOff"]);
    redirectUrl = items.redirect;
    limit = items.videoLimit;
    off = items.turnedOff;

    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0];

    console.log(`lastVideoUrl: ${lastVideoUrl}`);
    console.log(`currentTab.url: ${currentTab.url}`);
    console.log(`count: ${count}/${limit}`);

    if (currentTab.url !== lastVideoUrl) {
        lastVideoUrl = currentTab.url;
        if (count >= limit && limit > -1) {
            await browser.tabs.sendMessage(currentTab.id, {limitExceeded: true});
            await browser.tabs.update(currentTab.id, {url: redirectUrl});
        } else {
            count += 1;
        }
    }
}

browser.webRequest.onCompleted.addListener(addToCount, {urls: [target]});

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
