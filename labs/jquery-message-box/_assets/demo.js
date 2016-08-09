$(function(){
    
    /***************************************************************************
        Quick Demo
    ***************************************************************************/
    $("#quick_demo").on("click", function(event){
        $.MessageBox("Hi! That's a pretty nice MessageBox, isn't it?");
    });
    
    
    
    /***************************************************************************
        Example 1
    ***************************************************************************/
    // Alert
    $("#example1_alert").on("click", function(event){
        $.MessageBox("A plain MessageBox can replace Javascript's window.alert(), and it looks definitely better...");
    });
    
    // Confirm
    $("#example1_confirm").on("click", function(event){
        $.MessageBox({
            buttonDone  : "Yes",
            buttonFail  : "No",
            message     : "This looks better than a window.confirm(), don't you agree?"
        }).done(function(){
            $.MessageBox("Me too!");
        }).fail(function(){
            $.MessageBox("Yeah, sure... you IE6 nostalgic!");
        });
    });
    
    // Prompt
    $("#example1_prompt").on("click", function(event){
        $.MessageBox({
            input    : true,
            message  : "What's your name?"
        }).done(function(data){
            if ($.trim(data)) {
                $.MessageBox("Hi <b>"+data+"</b>!");
            } else {
                $.MessageBox("You are a mysterious one...");
            }
        });
    });
    
    
    
    /***************************************************************************
        Example 2
    ***************************************************************************/
    // Wrapper functions
    function MessageBoxConfirm(message){
        return $.MessageBox({
            buttonDone  : "Yes",
            buttonFail  : "No",
            message     : message
        });
    }
    
    function MessageBoxPrompt(message){
        return $.MessageBox({
            input   : true
            message : message
        });
    }
    
    // Concise Confirm
    $("#example2_confirm").on("click", function(event){
        MessageBoxConfirm("Is this simple enough?").done(function(){
            // Do something in response to YES
        }).fail(function(){
            // Do something in response to No
        });
    });
    
    // Concise Prompt
    $("#example2_prompt").on("click", function(event){
        MessageBoxPrompt("Give me some data:").done(function(data){
            // Do something with this data
        });
    });
    
    
    
    /***************************************************************************
        Example 3
    ***************************************************************************/
    $("#example3").on("click", function(event){
        // Just a regular MessageBox, all options to default
        $.MessageBox("First");
        
        // The same as the first one, it goes to the queue after it
        $.MessageBox("Second");
        
        // Now the interesting one: setting queue to false will show this MessageBox immediately on top of the others
        $.MessageBox({
            message : "Third",
            queue   : false
        });
    });
    
    
    
    /***************************************************************************
        Example 4
    ***************************************************************************/
    function Example4Log(handler, button){
        $("#example4_log").append("Handler <b>" + (handler ? ".done()" : ".fail()") + "</b>. Button: <b>" + button + "</b>");
    }
    function Example4ResetLog(){
        $("#example4_log").html("<i><u>Results will be logged here:</u></i>\n");
    }
    Example4ResetLog();
    
    $("#example4_simple").on("click", function(event){
        // Simple buttons: pass a string to buttonDone and buttonFail
        $.MessageBox({
            buttonDone  : "OK",
            buttonFail  : "Cancel",
            message     : "Some message..."
        }).done(function(data, button){
            Example4Log(true, button);
        }).fail(function(data, button){
            Example4Log(false, button);
        });
    });
    
    $("#example4_object").on("click", function(event){
        // Custom buttons: use a configuration object
        $.MessageBox({
            buttonDone  : {
                one : {
                    text    : "1 - Nice",
                    keyCode : [49, 97]
                },
                two : {
                    text    : "2 - Super",
                    keyCode : [50, 98]
                },
                three : {
                    text    : "3 - Great",
                    keyCode : [51, 99]
                }
            },
            buttonFail  : {
                zero : {
                    text    : "0 - Meh",
                    keyCode : [48, 96]
                },
            },
            buttonsOrder    : "fail done",
            message         : "How do you like it?<br>Click a button or press keys 0 to 3 on your keyboard:"
        }).done(function(data, button){
            Example4Log(true, button);
        }).fail(function(data, button){
            Example4Log(false, button);
        });
    });
        
    $("#example4_shorthand").on("click", function(event){
        // Shorthand: define only the buttons' name and text
        $.MessageBox({
            buttonDone  : {
                yes         : "Yes",
                maybe       : "Maybe"
            },
            buttonFail  : {
                no          : "No"
            },
            message     : "Will you marry me?"
        }).done(function(data, button){
            Example4Log(true, button);
        }).fail(function(data, button){
            Example4Log(false, button);
        });
    });
    
    
    
    /***************************************************************************
        Example 5
    ***************************************************************************/
    function Example5Log(data){
        $("#example5_log").append(JSON.stringify(data, null, "    "));
    }
    function Example5ResetLog(){
        $("#example5_log").html("<i><u>Results will be logged here:</u></i>\n");
    }
    Example5ResetLog();
    
    $("#example5_simple").on("click", function(event){
        // Simpe textbox
        $.MessageBox({
            input    : true,
            message  : "Input some string:"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_default").on("click", function(event){
        // Simpe textbox with default value
        $.MessageBox({
            input    : "Some default value",
            message  : "Input some string (again):"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_array").on("click", function(event){
        // Multiple textboxes with default values
        $.MessageBox({
            input    : ["Default value 1", "Default value 2", ""],
            message  : "Now let's try with three simple textbox.<br>For the first two a default value is provided:"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_object").on("click", function(event){
        // Multiple inputs of different types
        $.MessageBox({
            message : "<b>Here is a complex form with different input types!</b>",
            input   : {
                text1    : {
                    type        : "text",
                    label       : "Some text:",
                    title       : "Input some text"
                },
                text2    : {
                    type        : "text",
                    label       : "Some other text (max 10 characters and default value):",
                    title       : "Input some other text",
                    default     : "Hi!",
                    maxlength   : 10
                },
                password : {
                    type    : "password",
                    label   : "Secret password:",
                    title   : "Type password here"
                },
                select1 : {
                    type    : "select",
                    label   : "Select with values same as displayed texts:",
                    title   : "Select a letter",
                    options : ["A", "B", "C", "D", "E"]
                },
                select2 : {
                    type    : "select",
                    label   : "Select with values and texts specified and a default choice selected:",
                    title   : "Select S",
                    options : {
                        "A"   : "Letter A",
                        "B"   : "Letter B",
                        "C"   : "Letter C",
                        "D"   : "Letter D",
                        "E"   : "Letter E"
                    },
                    default : "C"
                }
            }
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_element").on("click", function(event){
        // Custom DOM/jQuery Element
        var select = $("<select>", {
            css : {
                "width"         : "100%",
                "margin-top"    : "1rem"
            }
        });
        select.append("<option>Option One</option>");
        select.append("<option>Option Two</option>");
        select.append("<option>Option Three</option>");
        $.MessageBox({
            message : "Choose an Option:",
            input   : select
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    
    
    /***************************************************************************
        Example 6
    ***************************************************************************/
    $("#example6_messagebox").on("click", function(event){
        // Custom MessageBox
        $.MessageBox({
            customClass : "custom_messagebox",
            message     : "You can customize the MessageBox using the <i>customClass</i> option"
        });
    });
    
    $("#example6_buttons").on("click", function(event){
        // Custom Buttons
        $.MessageBox({
            buttonDone  : {
                yes : {
                    text    : "Yes",
                    class   : "custom_button",
                    keyCode : 13
                }
            },
            buttonFail  : "No",
            message     : "You can customize single buttons using their <i>class</i> property"
        });
    });
    
    
})();