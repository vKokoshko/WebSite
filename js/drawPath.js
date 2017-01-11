;// Функция отрисовки пути
function painter(el){  
    var length = el.getTotalLength(),
        startTime,
        globalID,
        startPoint = length,
        direction = 1,
        drawnLength = 0,
        blurFlag = true;
    function doTimer(duration, callback){
        var step = 1,
            speed = 0,
            time = (new Date()).getTime();
        function instance()
        {   
            if(blurFlag = true){
                if (drawnLength >= length) {
                    cancelAnimationFrame(globalID);
                    if (callback != undefined)
                        callback();
                }
                else {
                    speed = (new Date()).getTime() - time;
                    step = (length - drawnLength) * speed / Math.abs(duration - ((new Date()).getTime() - startTime));
                    drawnLength += step;
                    if (drawnLength > length)
                        drawnLength = length;
                    el.style.strokeDashoffset = startPoint - direction * drawnLength;
                    time = (new Date()).getTime();
                    globalID = requestAnimationFrame(instance);
                }
            } else {
                globalID = requestAnimationFrame(instance);
            }
        }
        globalID = requestAnimationFrame(instance);
    };
    this.run = function(duration, mode, callback){
        startTime = (new Date()).getTime();
        el.style.strokeLinecap = "round";
        if (mode === "reversed")
            direction = -1;
        if (mode === "inverted")
            startPoint = 0;
        doTimer(duration, callback);
    };
    window.onblur = function(){
        blurFlag = false;
    };
    window.onfocus = function(){
        blurFlag = true;
    };
};

// Функция инициализации пути
var pathInit = function(el){
    length = el.getTotalLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;
};

// Функция запуска отрисовки пути
var drawPath = function(el, duration, mode, callback){
    if(typeof(mode) === "function") {
        new painter(el).run(duration, "", mode);
    } else {
        new painter(el).run(duration, mode, callback);
    }
};