$(document).ready(function(){
    $("#quick_demo_button").on("click", Demo.QuickDemo);
    $("#example1_button").on("click",   Demo.Example1);
});

var Demo = (function($, undefined){
    return {
        QuickDemo   : QuickDemo,
        Example1    : Example1,
    };
    
    function QuickDemo(event){
        $("#quick_demo").PopupWindow();
    }
    
    
    function Example1(event){
        // Log all Events
        $("#example1").on("open.popupwindow close.popupwindow collapse.popupwindow uncollapse.popupwindow minimize.popupwindow unminimize.popupwindow maximize.popupwindow unmaximize.popupwindow move.popupwindow resize.popupwindow destroy.popupwindow", function(event, data){
            $("#example1_log").append("Event <b>" + event.type + "</b> fired." + (data ? " Data: <b>" + JSON.stringify(data) + "</b>" : "") + "\n");
        });
        
        // Buttons to test Actions
        $("#example1_open").on("click", function(event){
            $("#example1").PopupWindow("open");
        });
        $("#example1_close").on("click", function(event){
            $("#example1").PopupWindow("close");
        });
        $("#example1_collapse").on("click", function(event){
            $("#example1").PopupWindow("collapse");
        });
        $("#example1_uncollapse").on("click", function(event){
            $("#example1").PopupWindow("uncollapse");
        });
        $("#example1_minimize").on("click", function(event){
            $("#example1").PopupWindow("minimize");
        });
        $("#example1_unminimize").on("click", function(event){
            $("#example1").PopupWindow("unminimize");
        });
        $("#example1_maximize").on("click", function(event){
            $("#example1").PopupWindow("maximize");
        });
        $("#example1_unmaximize").on("click", function(event){
            $("#example1").PopupWindow("unmaximize");
        });
        $("#example1_getposition").on("click", function(event){
            $("#example1_log").append("Current position: <b>" + JSON.stringify($("#example1").PopupWindow("getPosition")) + "</b>\n");
        });
        $("#example1_setposition").on("click", function(event){
            $("#example1").PopupWindow("setPosition", {
                top             : $("#example1_setposition_input_top").val(),
                left            : $("#example1_setposition_input_left").val(),
                animationTime   : $("#example1_setposition_input_animation").val()
            });
        });
        $("#example1_getsize").on("click", function(event){
            $("#example1_log").append("Current size: <b>" + JSON.stringify($("#example1").PopupWindow("getSize")) + "</b>\n");
        })
        $("#example1_setsize").on("click", function(event){
            $("#example1").PopupWindow("setSize", {
                width           : $("#example1_setsize_input_width").val(),
                height          : $("#example1_setsize_input_height").val(),
                animationTime   : $("#example1_setsize_input_animation").val()
            });
        });
        $("#example1_getstate").on("click", function(event){
            $("#example1_log").append("Current state: <b>" + $("#example1").PopupWindow("getState") + "</b>\n");
        });
        $("#example1_statusbar").on("click", function(event){
            $("#example1").PopupWindow("statusbar", $("#example1_statusbar_input_text").val());
        });
        $("#example1_settitle").on("click", function(event){
            $("#example1").PopupWindow("setTitle", $("#example1_settitle_input_title").val());
        });
        $("#example1_destroy").on("click", function(event){
            $("#example1").PopupWindow("destroy");
        });
        
        
        
        
        // Init PopupWindow
        $("#example1").PopupWindow({
            title           : "Example 1 - Complete playground",
            modal           : false,
            height          : 200,
            width           : 300,
            collapsedWidth  : 300,
            mouseMoveEvents : false
        });
        
        
        $("#example1_clear").on("click", function(event){
            $("#example1_log").html("PopupWindow events will be logged here\n");
        });
    }

    
    
})(jQuery);