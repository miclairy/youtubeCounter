
$(document).ready(function () {
    chrome.storage.local.get(["videoLimit", "redirect"], function(items){
        $("#redirectUrl").html(items.redirect);
        $("#videoLimit").html(items.videoLimit);
        $("#videos").val(items.videoLimit);
        $("#newRedirect").val(items.redirect );
    });

    $("#videos").hide();
    $("#newRedirect").hide();
    $("#error").hide();
    $("#errorVid").hide();
    $("#submitAll").hide();

    $("#settings").click(function(event){
            $("#redirectUrl").hide();
            $("#newRedirect").show();
            $("#videoLimit").hide();
            $("#videos").show(); 
            $("#submitAll").show();
        }
    )

    $("#submitAll").click(submit);

});

function submit(event){
    if (sendRedirectUrl(event) && sendVideoNumber(event)){
        event.preventDefault();
        $("#newRedirect").hide();
        $("#redirectUrl").show();
        $("#error").hide();

        $("#videos").hide();
        $("#videoLimit").show();
        $("#errorVid").hide();

        $("#submitAll").hide();
    }
    
}

function sendRedirectUrl(event){
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
        backgroundScript.setRedirect(url);
        $("#redirectUrl").html(url);
        $("#error").hide()
    } else {
        backgroundScript.setRedirect(null);
        $("#error").html("Not a valid Url");
        $("#error").show();
    }
    return valid;
}

function sendVideoNumber(event){
    
    var videos = $("#videos").val().trim();
    if (!(videos % 1 == 0 && videos >= 0 && videos != "")){
        $("#errorVid").html("Needs to be a positive integer");
        $("#errorVid").show();
    } else {
        $("#errorVid").hide();
        $("#videoLimit").html(videos);
        var backgroundScript = chrome.extension.getBackgroundPage();
        backgroundScript.setVideoLimit(videos);
    }
    return (videos % 1 == 0 && videos >= 0 && videos != "");
}