
$(document).ready(function () {
    chrome.storage.local.get(["videoLimit", "redirect", "turnedOff"], function(items){
        $("#redirectUrl").html(items.redirect);
        $("#videoLimit").html(items.videoLimit);
        $("#videos").val(items.videoLimit);
        $("#newRedirect").val(items.redirect );
        $("#off").prop('checked', items.turnedOff);
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

    $("#off").click(function(event){
        
        if ($("#off").prop('checked')){
            var backgroundScript = chrome.extension.getBackgroundPage();
            backgroundScript.turnOff();
        } else {
            var backgroundScript = chrome.extension.getBackgroundPage();
            backgroundScript.turnOn();
        }
    })

});

function submit(event){
    var valid = sendVideoNumber(event)
    var valid2 = sendRedirectUrl(event)
    if (valid && valid2){
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
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (valid == false){
        var addhttp = /[^ "]+$/.test(url);
        if (addhttp){
            url = "http://" + url;
            valid = true;
        }
    }
    
    var backgroundScript = chrome.extension.getBackgroundPage();
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