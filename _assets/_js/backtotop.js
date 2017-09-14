/*************************************************
Back to Top button
    Author  : Gaspare Sganga
    Version : 1.1.0
    License : MIT
*************************************************/
;var BackToTop = (function(window, undefined){
    // Default settings
    var _defaults = {
        speed           : 500,
        threshold       : 10,
        visibleClass    : "visible"
    };
    
    // Globals
    var _button;
    var _settings;
    
    
    // Public methods
    return {
        init    : init,
        destroy : destroy
    };
    
    function init(button, options){
        _button     = button;
        _settings   = _extend({}, _defaults, options);
        
        _button.addEventListener("click", function(){
            _animatedScroll(0, _settings.speed)
        });
        
        document.addEventListener("scroll", _checkOffset);
        _checkOffset();
    }
    
    function destroy(options){
        _button.classList.remove(_settings.visibleClass);
        document.removeEventListener("scroll", _checkOffset);
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

    function _checkOffset(){
        if (window.pageYOffset > _settings.threshold) {
            _button.classList.add(_settings.visibleClass);
        } else {
            _button.classList.remove(_settings.visibleClass);
        }
    } 
    
    function _animatedScroll(position, duration){
        var currentPosition = window.pageYOffset;
        if (currentPosition === 0 || duration < 0) return;
        var step = (position - currentPosition) / duration * 30;
        setTimeout(function(){
            window.scroll(0, currentPosition + step);
            _animatedScroll(position, duration - 10);
        }, 10);
    }
    
})(window);