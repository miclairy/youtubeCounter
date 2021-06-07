$(document).ready(async function () {
    $("#videos").hide();
    $("#newRedirect").hide();
    $("#error").hide();
    $("#errorVid").hide();
    $("#submitAll").hide();

    const items = await browser.storage.local.get(["videoLimit", "redirect", "turnedOff"]);
    $("#redirectUrl").html(items.redirect);
    $("#videoLimit").html(items.videoLimit);
    $("#videos").val(items.videoLimit);
    $("#newRedirect").val(items.redirect );
    $("#off").prop('checked', items.turnedOff);

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
            const backgroundScript = browser.extension.getBackgroundPage();
            backgroundScript.turnOff();
        } else {
            const backgroundScript = browser.extension.getBackgroundPage();
            backgroundScript.turnOn();
        }
    })

});

function submit(event){
    const valid = sendVideoNumber(event)
    const valid2 = sendRedirectUrl(event)
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

function sendRedirectUrl(_e){
    let url = $("#newRedirect").val();
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (valid === false){
        const addhttp = /[^ "]+$/.test(url);
        if (addhttp){
            url = "http://" + url;
            valid = true;
        } else {
            message = "Not a valid Url";
        }
    }
    let anotherVideo = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/g.test(url);
    if (anotherVideo) {
        valid = false;
        message = "Redirecting to youtube videos is forbidden"
    }
    
    const backgroundScript = browser.extension.getBackgroundPage();
    if (valid === true){
        backgroundScript.setRedirect(url);
        $("#redirectUrl").html(url);
        $("#error").hide()
    } else {
        backgroundScript.setRedirect(null);
        $("#error").html(message);
        $("#error").show();
    }
    return valid;
}

function sendVideoNumber(_e){
    
    const videos = $("#videos").val().trim();
    if (!(videos % 1 === 0 && videos >= 0 && videos !== "")){
        $("#errorVid").html("Needs to be a positive integer");
        $("#errorVid").show();
    } else {
        $("#errorVid").hide();
        $("#videoLimit").html(videos);
        const backgroundScript = browser.extension.getBackgroundPage();
        backgroundScript.setVideoLimit(videos);
    }
    return (videos % 1 === 0 && videos >= 0 && videos !== "");
}