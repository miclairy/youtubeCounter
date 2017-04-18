var limit = "Infinity";
var redirect = "www.google.com";

$(document).ready(function () {
    $("#videoLimit").html(limit);
    console.log(limit);
    $("#submitVideos").hide();
    $("#videos").hide();
    $("#newRedirect").hide();
    $("#submitRedirect").hide();
    $("#error").hide();
    $("#errorVid").hide();

    $("#videoLimit").click(function(event){
        $("#videoLimit").hide();
        $("#submitVideos").show();
        $("#videos").show();
    });

    $("#redirectUrl").click(function(event){
        $("#redirectUrl").hide();
        $("#newRedirect").show();
        $("#submitRedirect").show();
    })

    $("#submitVideos").click(sendVideoNumber);

    $("#submitRedirect").click(sendRedirectUrl);
});

function sendRedirectUrl(event){
    event.preventDefault();
    var url = $("#newRedirect").val();
    console.log("redirect " + url);
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (valid == false){
        var addhttp = /[^ "]+$/.test(url);
        if (addhttp){
            url = "http://" + url;
            valid = true;
        }
    }
    
    var backgroundScript = chrome.extension.getBackgroundPage();
    console.log("redirect " + url);
    if (valid == true){
        $("#newRedirect").hide();
        $("#submitRedirect").hide();
        backgroundScript.setRedirect(url);
        $("#redirectUrl").show();
        $("#redirectUrl").html(url);
        redirect = url;
        $("#error").hide();
    } else {
        backgroundScript.setRedirect(null);
        $("#error").html("Not a valid Url");
        $("#error").show();
    }
}

function sendVideoNumber(event){
    
    event.preventDefault();
    var videos = $("#videos").val();
    console.log(videos === parseInt(videos, 10))
    if (!(videos % 1 == 0 && videos >= 0)){
        $("#errorVid").html("Needs to be a positive integer");
        console.log("broke");
        $("#errorVid").show();
    } else {
        $("#submitVideos").hide();
        $("#videos").hide();
        $("#videoLimit").html(videos);
        limit = videos;
        $("#videoLimit").show();

        var backgroundScript = chrome.extension.getBackgroundPage();
        console.log("limit set to: " + limit);
        backgroundScript.setVideoLimit(videos);
        $("#errorVid").hide();
    }
}