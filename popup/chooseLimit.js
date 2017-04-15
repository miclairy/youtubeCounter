$(document).ready(function () {

    $("#submit").click(function(event){
        event.preventDefault();
        var videos = $("#videos").val();
        var backgroundScript = chrome.extension.getBackgroundPage();
        backgroundScript.setVideoLimit(videos);
        
    })
});