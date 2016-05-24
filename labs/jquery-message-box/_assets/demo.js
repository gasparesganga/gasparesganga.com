$(document).ready(function(){
    $("#quick_demo").on("click", Demo.Quick);
    $("#example1").on("click",   Demo.Example1);
    $("#example2").on("click",   Demo.Example2);
    $("#example3").on("click",   Demo.Example3);
    $("#example4").on("click",   Demo.Example4);
});

var Demo = (function($, undefined){
    return {
        Quick    : Quick,
        Example1 : Example1,
        Example2 : Example2,
        Example3 : Example3,
        Example4 : Example4
    };

    function Quick(event){
        $.MessageBox("Hi! That's a pretty nice MessageBox, isn't it?");
    }

    function Example1(event){
        $.MessageBox("A plain MessagBox can replace Javascript's window.alert(), and it looks definitely better...");
    }

    function Example2(event){
        $.MessageBox({
            buttonDone  : "Yes",
            buttonFail  : "No",
            message     : "Do you like me?"
        }).done(function(){
            $.MessageBox("Thanks!");
        }).fail(function(){
            $.MessageBox("Well, I don't like you either!");
        });
    }

    function Example3(event){
        $.MessageBox({
            input    : true,
            message  : "What's your name?"
        }).done(function(data){
            if ($.trim(data)) {
                $.MessageBox("Hi <b>"+data+"</b>!");
            } else {
                $.MessageBox("You are shy, aren't you?");
            }
        });
    }

    function Example4(event){
        // Create a Select and populate it
        var select = $("<select>");
        select.append("<option>Option One</option>");
        select.append("<option>Option Two</option>");
        select.append("<option>Option Three</option>");

        // Show a MessageBox with custom Input
        $.MessageBox({
            message : "Choose an Option:",
            input   : select
        }).done(function(data){
            $.MessageBox("You chose: " + data)
        });
    }

})(jQuery);