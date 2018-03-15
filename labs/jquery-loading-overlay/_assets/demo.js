$(function(){
    
    function setHideTimeout(delay){
        setTimeout(function(){
            $.LoadingOverlay("hide");
        }, delay || 3000);
    }
    
    function setProgressInterval(delay){
        var interval  = setInterval(function(){
            if (count >= 100) {
                clearInterval(interval);
                $.LoadingOverlay("hide");
                return;
            }
            count += 10;
            $.LoadingOverlay("progress", count);
        }, 300);
    }
    
    
    /***************************************************************************
        Quick Demo
    ***************************************************************************/
    $("#quick_demo").on("click", function(event){
        $.LoadingOverlay("show");
        setHideTimeout();
    });
    
    
    
    /***************************************************************************
        Example 1
    ***************************************************************************/
    $("#example1").on("click", function(event){
        $.LoadingOverlay("show");
        setHideTimeout();
    });
    
    
    
    /***************************************************************************
        Example 2
    ***************************************************************************/
    var _example2Active = false;
    $("#example2a").on("click", function(event){
        if (_example2Active) return false;
        var element = $(event.currentTarget).parent().prev();
        _example2Active = true;
        element.LoadingOverlay("show", {
            background  : "rgba(165, 190, 100, 0.5)"
        });
        setTimeout(function(){
            element.LoadingOverlay("hide", true);
            _example2Active = false;
        }, 3000);
    });
    
    $("#example2b").on("click", function(event){
        if (_example2Active) return false;
        var element = $(event.currentTarget).parent().prev();
        var h       = element.height();
        var w       = element.width();
        _example2Active = true;
        element.LoadingOverlay("show", {
            background  : "rgba(165, 190, 100, 0.5)",
            size        : 30
        });
        element.animate({
            height  : h * 2,
            width   : w / 2
        }, 2500, function(){
            element.animate({
                height  : h,
                width   : w
            }, 2500, function(){
                element.LoadingOverlay("hide").css({
                    height  : "",
                    width   : ""
                });
                _example2Active = false;
            })
        });
    });
    
    
    
    /***************************************************************************
        Example 3
    ***************************************************************************/
    $("#example3a").on("click", function(event){
        // Font Awesome
        $.LoadingOverlay("show", {
            image       : "",
            fontawesome : "fa fa-cog fa-spin"
        });
        setHideTimeout();
    });
    
    $("#example3b").on("click", function(event){
        // Text
        $.LoadingOverlay("show", {
            image       : "",
            text        : "Loading..."
        });
        setTimeout(function(){
            $.LoadingOverlay("text", "Yep, still loading...);
        }, 3000);
        setHideTimeout(5000);
    });
    
    $("#example3c").on("click", function(event){
        // Progress
        $.LoadingOverlay("show", {
            image       : "",
            progress    : true
        });
        setProgressInterval();
    });
    
    $("#example3d").on("click", function(event){
        // Custom
        var customElement = $("<div>", {
            "css"   : {
                "border"    : "2px dashed gold",
                "padding"   : "5px"
            },
            "class" : "your-custom-class",
            "text"  : "Just a test"
        });
        $.LoadingOverlay("show", {
            image       : "",
            custom      : customElement
        });
        setHideTimeout();
    })
    
    
    
    /***************************************************************************
        Example 4
    ***************************************************************************/
    $("#example4").on("click", function(event){
        $.LoadingOverlay("show", {
            background              : $("#example4_background").val(),
            image                   : $("#example4_image").val(),
            imageAnimation          : $("#example4_imageAnimationd").val(),
            imageAutoResize         : $("#example4_imageAutoResize").prop("checked"),
            imageResizeFactor       : $("#example4_imageResizeFactord").val(),
            imageColor              : $("#example4_imageColor").val(),
            imageOrder              : $("#example4_imageOrder").val(),
            
            fontawesome             : $("#example4_fontawesome").val(),
            /*fontawesomeAutoResize   : true,
            fontawesomeResizeFactor : 1,
            fontawesomeColor        : "#202020",
            fontawesomeOrder        : 2,
            // Custom
            custom                  : "",
            customAnimation         : false,
            customAutoResize        : true,
            customResizeFactor      : 1,
            customOrder             : 3,
            // Text
            text                    : "",
            textAnimation           : false,
            textAutoResize          : true,
            textResizeFactor        : 0.5,
            textColor               : "#202020",
            textClass               : "",
            textOrder               : 4,
            // Progress
            progress                : false,
            progressAutoResize      : true,
            progressResizeFactor    : 0.25,
            progressColor           : "#a0a0a0",
            progressClass           : "",
            progressOrder           : 5,
            progressSpeed           : 200,
            progressMin             : 0,
            progressMax             : 100,*/
            // Sizing
            size                    : $("#example4_size").val(),
            maxSize                 : $("#example4_maxSize").val(),
            minSize                 : $("#example4_minSize").val(),
            // Misc
            direction               : $("#example4_direction").val(),
            fade                    : [$("#example4_fade1").val(), $("#example4_fade2").val()],
            resizeInterval          : $("#example4_resizeInterval").val(),
            zIndex                  : $("#example4_zIndex").val(),
        });
        setHideTimeout(parseInt($("#example4_timeout").val(), 10));
    });
    
    
    
    /***************************************************************************
        Example 5
    ***************************************************************************/
    $("#example5").on("click", function(event){
        $.LoadingOverlay("show", {
            background      : "rgba(0, 0, 0, 0.5)",
            image           : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 420'><path d='M210.389,0.001C94.381,0.001,0,94.382,0,210.389c0,116.006,94.381,210.387,210.389,210.387 s210.388-94.381,210.388-210.387C420.777,94.382,326.396,0.001,210.389,0.001z M210.389,386.5 c-97.102,0-176.109-79.012-176.109-176.111c0-97.101,79.007-176.109,176.109-176.109c97.101,0,176.109,79.008,176.109,176.109 C386.498,307.489,307.49,386.5,210.389,386.5z M319.061,156.275c3.516,5.094,2.24,12.072-2.854,15.59l-101.554,70.163 c-1.906,1.312-4.136,1.98-6.372,1.98c-1.781,0-3.57-0.427-5.207-1.28c-3.684-1.947-6-5.762-6-9.926V82.639 c0-6.186,5.021-11.207,11.207-11.207c6.188,0,11.206,5.021,11.206,11.207v128.8l83.979-58.02 C308.568,149.917,315.559,151.195,319.061,156.275z'/></svg>",
            imageAnimation  : "1.5s fadein",
            imageColor      : "#ffcc00"
        });
        setHideTimeout();
    });
    
});