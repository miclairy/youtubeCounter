browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.limitExceeded === true) {
            // document.getElementsByTagName("video")[0].pause();  TODO fix me
            alert("Limit exceeded on videos");
            sendResponse({redirect: true});
        }
    });
