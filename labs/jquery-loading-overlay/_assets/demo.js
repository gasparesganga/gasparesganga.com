$(document).ready(function(){
    $("#quick_demo").on("click",        Demo.Example1);
    $("#example1").on("click",          Demo.Example1);
    $("#example2").on("click",          Demo.Example2);
    $("#example3").on("click",          Demo.Example3);
    $("#example4").on("click",          Demo.Example4);
    $("#example5").on("click",          Demo.Example5);
    $("#example7").on("click",          Demo.Example7);
    $("#extraprogress1").on("click",    Demo.ExtraProgress1);
});

var Demo = (function($, undefined){
    return {
        Example1        : Example1,
        Example2        : Example2,
        Example3        : Example3,
        Example4        : Example4,
        Example5        : Example5,
        Example7        : Example7,
        ExtraProgress1  : ExtraProgress1
    };

    function Example1(event){
        $.LoadingOverlay("show");
        setTimeout(function(){
            $.LoadingOverlay("hide");
        }, 3000);
    }

    function Example2(event){
        var element = $(event.currentTarget).parent().prev();
        element.LoadingOverlay("show", {
            color   : "rgba(165, 190, 100, 0.5)"
        });
        setTimeout(function(){
            element.LoadingOverlay("hide");
        }, 3000);
    }

    function Example3(event){
        var element = $(event.currentTarget).parent().prev();
        var h       = element.height();
        var w       = element.width();
        element.LoadingOverlay("show", {
            color           : "rgba(165, 190, 100, 0.5)",
            size            : "30%",
            resizeInterval  : 20
        });
        element.animate({
            height  : h * 2,
            width   : w / 2
        }, 2500, function(){
            element.animate({
                height  : h,
                width   : w
            }, 2500, function(){
                element.LoadingOverlay("hide");
            })
        });
    }
    
    function Example4(event){
        $.LoadingOverlay("show", {
            image       : "",
            fontawesome : "fa fa-spinner fa-spin"
        });
        setTimeout(function(){
            $.LoadingOverlay("hide");
        }, 3000);
    }
    
    function Example5(event){
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
        
        var interval = setInterval(function(){
            count--;
            customElement.text(count);
            if (count <= 0) {
                clearInterval(interval);
                $.LoadingOverlay("hide");
                return;
            }
        }, 1000);
    }
    
    function Example7(event){
        $.LoadingOverlay("show", {
             fade  : [2000, 1000]
        });
        setTimeout(function(){
            $.LoadingOverlay("hide");
        }, 5000);
    }
    
    function ExtraProgress1(event){
        var progress = new LoadingOverlayProgress();
        $.LoadingOverlay("show", {
            custom  : progress.Init()
        });
        var count     = 0;
        var interval  = setInterval(function(){
            if (count >= 100) {
                clearInterval(interval);
                delete progress;
                $.LoadingOverlay("hide");
                return;
            }
            count++;
            progress.Update(count);
        }, 100);
    }
    
})(jQuery);