//= require ../_js/backtotop.js


(function(window, undefined){
    // Back to top button
    BackToTop.init(document.getElementById("backtotop"), {
        speed           : 500,
        threshold       : 10,
        visibleClass    : "visible"
    });
})(window);