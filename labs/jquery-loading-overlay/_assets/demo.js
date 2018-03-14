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
        setHideTimeout();
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
        var count           = 5;
        var customElement   = $("<div>", {
            id      : "countdown",
            css     : {
                "font-size" : "50px"
            },
            text    : count
        });
        
        $.LoadingOverlay("show", {
            image   : "",
            custom  : customElement
        });
        
        
        setProgressInterval();
    });
    
    
    
    /***************************************************************************
        Example 5
    ***************************************************************************/
    $("#example5").on("click", function(event){
        $.LoadingOverlay("show", {
            background      : "rgba(0, 0, 0, 0.5)",
            image           : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNDIwIj48cGF0aCBkPSJNMjEwLjM4OSwwLjAwMUM5NC4zODEsMC4wMDEsMCw5NC4zODIsMCwyMTAuMzg5YzAsMTE2LjAwNiw5NC4zODEsMjEwLjM4NywyMTAuMzg5LDIxMC4zODcgczIxMC4zODgtOTQuMzgxLDIxMC4zODgtMjEwLjM4N0M0MjAuNzc3LDk0LjM4MiwzMjYuMzk2LDAuMDAxLDIxMC4zODksMC4wMDF6IE0yMTAuMzg5LDM4Ni41IGMtOTcuMTAyLDAtMTc2LjEwOS03OS4wMTItMTc2LjEwOS0xNzYuMTExYzAtOTcuMTAxLDc5LjAwNy0xNzYuMTA5LDE3Ni4xMDktMTc2LjEwOWM5Ny4xMDEsMCwxNzYuMTA5LDc5LjAwOCwxNzYuMTA5LDE3Ni4xMDkgQzM4Ni40OTgsMzA3LjQ4OSwzMDcuNDksMzg2LjUsMjEwLjM4OSwzODYuNXogTTMxOS4wNjEsMTU2LjI3NWMzLjUxNiw1LjA5NCwyLjI0LDEyLjA3Mi0yLjg1NCwxNS41OWwtMTAxLjU1NCw3MC4xNjMgYy0xLjkwNiwxLjMxMi00LjEzNiwxLjk4LTYuMzcyLDEuOThjLTEuNzgxLDAtMy41Ny0wLjQyNy01LjIwNy0xLjI4Yy0zLjY4NC0xLjk0Ny02LTUuNzYyLTYtOS45MjZWODIuNjM5IGMwLTYuMTg2LDUuMDIxLTExLjIwNywxMS4yMDctMTEuMjA3YzYuMTg4LDAsMTEuMjA2LDUuMDIxLDExLjIwNiwxMS4yMDd2MTI4LjhsODMuOTc5LTU4LjAyIEMzMDguNTY4LDE0OS45MTcsMzE1LjU1OSwxNTEuMTk1LDMxOS4wNjEsMTU2LjI3NXoiLz48L3N2Zz4=",
            imageAnimation  : "1.5s fadein",
            imageColor      : "#ffcc00"
        });
        setHideTimeout();
    });
    
});