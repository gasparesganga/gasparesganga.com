var Demo = (function($, undefined){
   
   $(function(){
        QuickDemo();
        Example1();
        Example2();
        Example3();
    });
    
    
    function QuickDemo(){
        $("#quick_demo").PopupWindow({
            autoOpen    : false
        });
        $("#quick_demo_button").on("click", function(event){
            $("#quick_demo").PopupWindow("open");
        });
    }
    
    
    function Example1(){
        // Log all Events
        $("#example1").on(  
            "open.popupwindow      close.popupwindow      " +
            "collapse.popupwindow  uncollapse.popupwindow " +
            "minimize.popupwindow  unminimize.popupwindow " +
            "maximize.popupwindow  unmaximize.popupwindow " +
            "move.popupwindow      resize.popupwindow     " +
            "destroy.popupwindow",
        function(event, data){
            $("#example1_log").append("Event <b>" + event.type + "</b> fired." + (data ? " Data: <b>" + JSON.stringify(data) + "</b>" : "") + "\n");
        });
        
        // Buttons to test Actions
        $("#example1_init").on("click", function(event){
            $("#example1").PopupWindow("destroy");
            $("#example1").PopupWindow({
                title           : "Example 1 - Complete playground",
                modal           : false,
                buttons         : {
                    close           : $("#example1_init_input_close").prop("checked"),
                    maximize        : $("#example1_init_input_maximize").prop("checked"),
                    collapse        : $("#example1_init_input_collapse").prop("checked"),
                    minimize        : $("#example1_init_input_minimize").prop("checked")
                },
                buttonsPosition : $("#example1_init_input_buttonsPosition").val(),
                draggable       : $("#example1_init_input_draggable").val() === "true",
                resizable       : $("#example1_init_input_resizable").val() === "true",
                statusBar       : $("#example1_init_input_statusBar").val() === "true",
                top             : $("#example1_init_input_top").val(),
                left            : $("#example1_init_input_left").val(),
                height          : $("#example1_init_input_height").val(),
                width           : $("#example1_init_input_width").val(),
                maxHeight       : $("#example1_init_input_maxHeight").val(),
                maxWidth        : $("#example1_init_input_maxWidth").val(),
                minHeight       : $("#example1_init_input_minHeight").val(),
                minWidth        : $("#example1_init_input_minWidth").val(),
                collapsedWidth  : $("#example1_init_input_collapsedWidth").val(),
                keepInViewport  : $("#example1_init_input_keepInViewport").val() === "true",
                mouseMoveEvents : $("#example1_init_input_mouseMoveEvents").val() === "true"
            });
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        $("#example1_destroy").on("click", function(event){
            $("#example1").PopupWindow("destroy");
        });
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
                animationTime   : $("#example1_setposition_input_animationTime").val()
            });
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        $("#example1_getsize").on("click", function(event){
            $("#example1_log").append("Current size: <b>" + JSON.stringify($("#example1").PopupWindow("getSize")) + "</b>\n");
        })
        $("#example1_setsize").on("click", function(event){
            $("#example1").PopupWindow("setSize", {
                width           : $("#example1_setsize_input_width").val(),
                height          : $("#example1_setsize_input_height").val(),
                animationTime   : $("#example1_setsize_input_animationTime").val()
            });
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        $("#example1_getstate").on("click", function(event){
            $("#example1_log").append("Current state: <b>" + $("#example1").PopupWindow("getState") + "</b>\n");
        });
        $("#example1_setstate").on("click", function(event){
            $("#example1").PopupWindow("setState", $("#example1_setstate_input_state").val());
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        $("#example1_settitle").on("click", function(event){
            $("#example1").PopupWindow("setTitle", $("#example1_settitle_input_title").val());
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        $("#example1_statusbar").on("click", function(event){
            $("#example1").PopupWindow("statusbar", $("#example1_statusbar_input_text").val());
            $(event.currentTarget).closest(".example1_inputs").hide();
        });
        
        // Clear Log
        $("#example1_clear").on("click", function(event){
            $("#example1_log").html("<i><u>PopupWindow events and data will be logged here:</u></i><br><br>");
        });
        
        // UI
        $("#example1_init_toggle, #example1_setposition_toggle, #example1_setsize_toggle, #example1_setstate_toggle, #example1_settitle_toggle, #example1_statusbar_toggle").on("click", function(event){          
            $(event.currentTarget).next(".example1_inputs").toggle();
        });
        $(document).on("click", function(event){
            var $this = $(event.target);
            if (!$this.closest(".example1_inputs").length) $(".example1_inputs").not($this.next(".example1_inputs")).hide();
        });
        $(".example1_inputs").hide();
        
        // Default Values
        var _defaultValues = {};
        $("#example1_buttons").find("input[type=text]").each(function(){
            var $this = $(this);
            _defaultValues[$this.attr("id")] = $this.val();
        });
        $("#example1_buttons").on("blur", "input[type=text]", function(event){
            var $this   = $(event.currentTarget);
            var id      = $this.attr("id");
            var value   = $.trim($this.val());
            if (value == "") {
                value = _defaultValues[id];
            } else if (value != _defaultValues[id]) {
                value = parseInt(value) || _defaultValues[id];
            }
            $this.val(value);
        });
    }
    
    
    function Example2(){
        $("#example2_first").PopupWindow({
            title       : "Example 2 - Modal window",
            modal       : true,
            autoOpen    : false,
            statusBar   : false,
            height      : 250,
            width       : 400,
            top         : 100,
            left        : 300
        });
        $("#example2_second").PopupWindow({
            title       : "Other window",
            modal       : false,
            autoOpen    : false,
            statusBar   : false,
            top         : 400,
            left        : 100
        });
        $("#example2_third").PopupWindow({
            title       : "Yet another one",
            modal       : false,
            autoOpen    : false,
            statusBar   : false,
            top         : 400,
            left        : 600
        });
        
        $("#example2_first").on("close.popupwindow", function(event){
            $("#example2_second").PopupWindow("close");
            $("#example2_third").PopupWindow("close");
        });
       
        $("#example2_button1").on("click", function(event){
            $("#example2_first").PopupWindow("open");
        });
        $("#example2_button2").on("click", function(event){
            $("#example2_second").PopupWindow("open");
        });
        $("#example2_button3").on("click", function(event){
            $("#example2_third").PopupWindow("open");
        });
    }
    
    
    function Example3(){
        $("#example3_default").PopupWindow({
            title       : "Example 3 - Default Style",
            modal       : false,
            autoOpen    : false,
            buttons     : {
                collapse    : false
            },
            left        : 100
        });
        $("#example3_custom").PopupWindow({
            title           : "Example 3 - Custom Style",
            modal           : false,
            autoOpen        : false,
            customClass     : "custom_style",
            buttons         : {
                collapse        : false
            },
            buttonsPosition : "left",
            left            : 600
        });
        
        $("#example3_default_button").on("click", function(event){
            $("#example3_default").PopupWindow("open");
        });
        $("#example3_custom_button").on("click", function(event){
            $("#example3_custom").PopupWindow("open");
        });
    }
    
})(jQuery);