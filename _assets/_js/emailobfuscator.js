/*************************************************
Email Obfuscator
    Author  : Gaspare Sganga
    Version : 1.0.0
    License : MIT
*************************************************/
;var EmailObfuscator = (function(undefined){
    "use strict";
    
    // Default settings
    var _defaults = {
        address : "",
        text    : "email",
        title   : "Show email address"
    };
    
    
    // Public methods
    return {
        encode      : encode,
        init        : init,
        setDefaults : setDefaults
    };
    
    
    function encode(input){
        var parts = input.split("@");
        input = _reverse(parts[0]) + "|" + _reverse(parts[1]);
        var encoded = [];
        for (var i = input.length - 1; i >= 0; i--) {
            encoded.unshift(["&#", input[i].charCodeAt(), ";"].join(""));
        }
        console.log("Encoded address:");
        console.log(encoded.join(""));
    }
    
    function init(wrapper, options){
        if (typeof options === "string") options = {address : options};
        var settings        = _extend({}, _defaults, options);
        var anchor          = document.createElement("a");
        settings.address    = _decode(settings.address, settings.algorithm);
        anchor.href         = "#";
        anchor.innerText    = settings.text;
        anchor.title        = settings.title;
        anchor.addEventListener("click", function(event){
            if (!anchor.hasAttribute("email_shown")) {
                anchor.href         = "mailto:" + settings.address;
                anchor.innerText    = settings.address;
                anchor.title        = "";
                anchor.setAttribute("email_shown", true);
                event.preventDefault();
            }
        });
        wrapper.appendChild(anchor);
    }
    
    function setDefaults(options){
        _extend(_defaults, options);
    }
    
    
    // Private methods
    function _extend(){
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
            }
        }
        return arguments[0];
    }
    
    function _decode(input){
        var decoded = input.replace(/&#(\d+);/g, function(match, value){
            return String.fromCharCode(value);
        }).split("|");
        return _reverse(decoded[0]) + "@" + _reverse(decoded[1]);
    }
    
    function _reverse(input){
        return input.split("").reverse().join("");
    }
    
})();