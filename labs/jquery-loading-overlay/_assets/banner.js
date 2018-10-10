$(function(){
    setTimeout(function(){
        var banner = $("<div>", {
            css     : {
                "font-size"     : "1.1rem",
                "line-height"   : "1.5"
            },
            id      : "banner",
            html    : "I know you are here for <b>jQuery LoadingOverlay</b>, but if you like it then I'm sure you will love my <a href='/labs/jquery-message-box/' target='_blank'><b>jQuery MessageBox</b></a> plugin too!<div style='margin-top:1rem; font-size:0.9rem; font-style:italic;'>By the way, this is a nice example of LoadingOverlay used in a creative way...</div>"
        });
            
        $("<button>", {
            css     : {
                "display"   : "block",
                "padding"   : "5px 35px",
                "margin"    : "1.5rem auto"
            },
            text    : "Dismiss"
        })
        .on("click", function(event){
            $.LoadingOverlay("hide");
        })
        .appendTo(banner);
        
        $.LoadingOverlay("show", {
            background  : "rgba(255,255,255,0.9)",
            custom      : banner,
            image       : false,
            size        : "80%",
            maxSize     : 530
        });
    }, 1000);
});