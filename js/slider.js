$(document).ready(function() {
    var ul, li_items;
    var imageNumber, imageWidth;
    var currentPostion = 0, currentImage = 0;

    // init
    (function() {
        ul = $("#image_slider")[0];
        $(ul).css("left", "0");
        li_items = $(ul).children();
        imageNumber = li_items.length;
        imageWidth = li_items[0].children[0].clientWidth;
        
        if(imageWidth === 0) {
            // imageWidth = 420;
            imageWidth = $(".slide_img")[0];
            imageWidth = window.getComputedStyle(imageWidth);
            imageWidth = parseInt(imageWidth.getPropertyValue("width"));
        }
        $(ul).css("width", parseInt(imageWidth * imageNumber) + "px");
        
        toggleClickOn();
    })();

    function animate(opts) {
        var start = new Date();
        var id = setInterval(function() {
            var timePassed = new Date() - start;
            var progress = timePassed / opts.duration;
            
            if(progress > 1)
                progress = 1;
            
            var delta = opts.delta(progress);
            opts.step(delta);
            
            if(progress === 1){
                clearInterval(id);
                opts.callback();
            }
        }, opts.delay || 17);
    }

    function slideTo(imageToGo) {
        var direction;
        var numOfImageToGo = Math.abs(imageToGo - currentImage);
        
        // slide left
        direction = currentImage > imageToGo ? 1 : -1;
        currentPostion = -1 * currentImage * imageWidth;
        var opts = {
            duration: 1000,
            delta: function(p) {
                return p;
            },
            step: function(delta) {
                $(ul).css("left", parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px');
            },
            callback: function() {
                currentImage = imageToGo;
                toggleClickOn();
            }	
        };
        animate(opts);
    }

    function onClickPrev() {
        toggleClickOff();
        if(currentImage === 0) 
            slideTo(imageNumber - 1);
        else
            slideTo(currentImage - 1);
        
    }

    function onClickNext() {
        toggleClickOff();
        if(currentImage === imageNumber - 1) 
            slideTo(0);
        else
            slideTo(currentImage + 1);
        
    }

    function toggleClickOn() {
        $("#prev, #next").on("click");

        $("#prev").click(onClickPrev);
        $("#next").click(onClickNext);
    }

    function toggleClickOff() {
        $("#prev, #next").off("click");
    }
});