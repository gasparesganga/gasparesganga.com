(function(window){
    window.addEventListener("load", function(){
        var body    = document.documentElement;
        var button  = document.getElementById("backtotop");
        document.addEventListener("scroll", function(){
            button.className = (body.scrollTop > 10) ? "visible" : "";
        });
        button.addEventListener("click", function(){
            animatedScroll(body, 0, 500)
        });
        
        function animatedScroll(element, position, duration){
            var currentPosition = element.scrollTop;
            if (currentPosition == 0 || duration < 0) return;
            var step = (position - currentPosition) / duration * 30;
            setTimeout(function(){
                element.scrollTop = currentPosition + step;
                animatedScroll(element, position, duration - 10);
            }, 10);
        } 
    });
})(window);