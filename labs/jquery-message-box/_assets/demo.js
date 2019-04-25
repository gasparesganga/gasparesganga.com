$(function(){
    
    /***************************************************************************
        Quick Demo
    ***************************************************************************/
    $("#quick_demo1").on("click", function(event){
        $.MessageBox("Hi! That's a pretty nice MessageBox, isn't it?");
    });
    
    $("#quick_demo2").on("click", function(event){
        $.MessageBox({
            buttonDone      : "OK",
            buttonFail      : "Cancel",
            message         : "Let's try a more complex example:<br>here are multiple fields of different types,<br>an error message will be displayed if validation fails.",
            input           : {
                name : {
                    type    : "text",
                    label   : "Name:",
                    title   : "Your name"
                },
                sex : {
                    type    : "select",
                    label   : "Sex:",
                    title   : "Please choose one",
                    options : ["Male", "Female", "Can't decide..."]
                },
                password : {
                    type    : "password",
                    label   : "Password:",
                    title   : "Something secret here"
                }
            },
            title           : "More complete example",
            filterDone      : function(data){
                if (data.name === "")           return "Please insert your <b>name</b>";
                if (data.sex === null)          return "Have you already chosen your <b>sex</b>?";
                if (data.password === "")       return "Please insert a <b>password</b>";
                if (data.password.length < 8)   return "The <b>password</b> must be at least 8 characters";
            }
        });
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
            input   : true,
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
        Example4ResetLog();
        $("#example4_log").append("Handler <b>" + (handler ? ".done()" : ".fail()") + "</b>. Button: <b>" + button + "</b>");
    }
    function Example4ResetLog(){
        $("#example4_log").html("<i><u>Results will be logged here:</u></i>\n\n");
    }
    Example4ResetLog();
    
    $("#example4_simple").on("click", function(event){
        // Simple buttons: pass a string to buttonDone and buttonFail
        $.MessageBox({
            buttonDone  : "OK",
            buttonFail  : "Cancel",
            message     : "Some message...",
            title       : "Simple"
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
            message         : "How do you like it?<br>Click a button or press keys 0 to 3 on your keyboard:",
            title           : "Object"
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
            message     : "Will you marry me?",
            title       : "Shorthand"
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
        Example5ResetLog()
        $("#example5_log").append(JSON.stringify(data, null, "    "));
    }
    function Example5ResetLog(){
        $("#example5_log").html("<i><u>Results will be logged here:</u></i>\n\n");
    }
    Example5ResetLog();
    
    $("#example5_simple").on("click", function(event){
        // Simpe textbox
        $.MessageBox({
            input   : true,
            message : "Input some string:",
            title   : "Simple"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_default").on("click", function(event){
        // Simpe textbox with default value
        $.MessageBox({
            input   : "Some default value",
            message : "Input some string (again):",
            title   : "Default value"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    $("#example5_array").on("click", function(event){
        // Multiple textboxes with default values
        $.MessageBox({
            input   : ["Default value 1", "Default value 2", ""],
            message : "Now let's try with three simple textbox.<br>For the first two a default value is provided:",
            title   : "Array"
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
                    type         : "text",
                    label        : "Some text:",
                    title        : "Input some text"
                },
                text2    : {
                    type         : "text",
                    label        : "Some other text (max 10 characters):",
                    title        : "Input some other text",
                    defaultValue : "Hi!",
                    maxlength    : 10
                },
                password1 : {
                    type         : "password",
                    label        : "Secret password:",
                    title        : "Type password here"
                },
                checkbox1 : {
                    type         : "checkbox",
                    label        : "A good ol' checkbox:",
                    title        : "Check or uncheck this, no big deal"
                },
                dummy_caption : {
                    type         : "caption",
                    message      : "This is a <b>caption</b>, sometimes you might need one",
                    title        : "aaaaaaaaaa"
                },
                select1 : {
                    type         : "select",
                    label        : "Select with values same as displayed texts:",
                    title        : "Select a letter",
                    options      : ["A", "B", "C", "D", "E"]
                },
                select2 : {
                    type         : "select",
                    label        : "Select with values and texts specified and a default choice selected:",
                    title        : "Select S",
                    options      : {
                        "A" : "Letter A",
                        "B" : "Letter B",
                        "C" : "Letter C",
                        "D" : "Letter D",
                        "E" : "Letter E"
                    },
                    defaultValue : "C"
                },
                textarea1    : {
                    type    : "textarea",
                    label   : "You get to write a lot here:",
                    title   : "You can use either \"textarea\" or \"memo\" to display this"
                }
            },
            top     : "auto",
            title   : "Object"
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
            input   : select,
            title   : "Custom DOM/jQuery Element"
        }).done(function(data){
            Example5Log(data);
        });
    });
    
    
    
    /***************************************************************************
        Example 6
    ***************************************************************************/
    $("#example6_simple").on("click", function(event){
        // Simple
        $.MessageBox({
            buttonDone      : "OK",
            buttonFail      : "Cancel",
            message         : "You won't be able to continue unless you enter some string here:",
            input           : true,
            filterDone      : function(data){
                if (data === "") return false;
            }
        });
    });
    
    $("#example6_error").on("click", function(event){
        // Error
        $.MessageBox({
            buttonDone      : "OK",
            buttonFail      : "Cancel",
            message         : "If you don't compile both fields an error message will pop up:",
            input           : ["", ""],
            filterDone      : function(data){
                if (data[0] === "") return "Please fill the first input";
                if (data[1] === "") return "Please fill the second input";
            }
        });
    });
    
    $("#example6_ajax1").on("click", function(event){
        // Ajax
        $.MessageBox({
            buttonDone      : "OK",
            buttonFail      : "Cancel",
            message         : "You can even perform an ajax request<br>to validate the inputs:",
            input           : {
                username : {
                    type    : "text",
                    label   : "Username (user):",
                    title   : "Username"
                },
                password : {
                    type    : "password",
                    label   : "Password (secret):",
                    title   : "Password"
                }
            },
            filterDone      : function(data){
                // Note the use of ".then()" instead of ".done()" to return a new promise
                return $.ajax({
                    url     : "login_1.php",
                    type    : "post",
                    data    : data
                }).then(function(response){
                    if (response == false) return "Wrong username or password";
                });
            }
        });
    });
    
    $("#example6_ajax2").on("click", function(event){
        // Ajax with HTTP status code
        $.MessageBox({
            buttonDone      : "OK",
            buttonFail      : "Cancel",
            message         : "A better example, using HTTP status codes:",
            input           : {
                username : {
                    type    : "text",
                    label   : "Username (user):",
                    title   : "Username"
                },
                password : {
                    type    : "password",
                    label   : "Password (secret):",
                    title   : "Password"
                }
            },
            filterDone      : function(data){
                // Note the use of ".then()" instead of ".done()" to return a new promise
                return $.ajax({
                    url     : "login_2.php",
                    type    : "post",
                    data    : data
                }).then(function(){
                    // HTTP status code 200: Login OK
                    return true;
                }, function(jqXHR, textStatus, errorThrown){
                    // Any other HTTP status code: Login failed
                    return "Message from server (" + jqXHR.status + "):<br>" + jqXHR.responseText;
                });
            }
        });
    });
    
    
    
    /***************************************************************************
        Example 7
    ***************************************************************************/
    $("#example7_messagebox").on("click", function(event){
        // Custom MessageBox
        $.MessageBox({
            customClass         : "custom_messagebox",
            customOverlayClass  : "custom_messagebox_overlay",
            message             : "Radius... radius everywhere! <i>(and green too)</i>",
            title               : "A NICE TITLE, WHY NOT?"
        });
    });
    
    $("#example7_buttons").on("click", function(event){
        // Custom Inputs and Buttons
        $.MessageBox({
            buttonDone  : {
                cool : {
                    text        : "Cool",
                    customClass : "custom_button",
                    keyCode     : 13
                }
            },
            buttonFail  : "Boring",
            input       : {
                input1    : {
                    type        : "text",
                    label       : "A custom input",
                    customClass : "custom_input"
                }
            },
            message     : "You can customize single buttons or inputs using their <i>customClass</i> property"
        });
    });
    
});