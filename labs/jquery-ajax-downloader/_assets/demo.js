$(document).ready(function(){
    $("#quick_demo").on("click",    Demo.Example1);
    $("#example1").on("click",      Demo.Example1);
    $("#example2").on("click",      Demo.Example2);
});

var Demo = (function($, undefined){
    return {
        Example1 : Example1,
        Example2 : Example2
    };
    
    function Example1(event){
        $.AjaxDownloader({
            url : "./static_file.zip"
        });
    }
    
    function Example2(event){
        $.AjaxDownloader({
            url     : "./download_manager.php",
            data    : {
                param1  : "xxx",
                param2  : "yyy",
                param3  : "zzz"
            }
        });
    }
    
})(jQuery);