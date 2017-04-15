$("#send").click(function(event){
    var videos = $("#videos").val();
    var backgroundScript = chrome.extension.getBackgroundPage();
    backgroundScript.setVideoLimit(videos);
    console.log("clicked")
})