(function(window){
    window.addEventListener("load", function(){
        var button = document.getElementById("backtotop");
        document.addEventListener("scroll", function(){
            button.className = (window.pageYOffset > 10) ? "visible" : "";
        });
        button.addEventListener("click", function(){
            animatedScroll(0, 500)
        });
        
        function animatedScroll(position, duration){
            var currentPosition = window.pageYOffset;
            if (currentPosition == 0 || duration < 0) return;
            var step = (position - currentPosition) / duration * 30;
            setTimeout(function(){
                window.scroll(0, currentPosition + step);
                animatedScroll(position, duration - 10);
            }, 10);
        }
    });
})(window);