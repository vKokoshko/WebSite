;function animateClip(cur, sr){
    
    var bg_l = ((document.documentElement.clientWidth - 1920 * sr) / 2) / sr,
        bg_w = "width:" + (document.documentElement.clientWidth / sr) + "px;",
        bg_l_str = "left:-" + bg_l + "px;",
        bg_t = ((document.documentElement.clientHeight - 1080 * sr) / 2) / sr,
        bg_h = "height:" + (document.documentElement.clientHeight / sr) + "px;",
        bg_t_str = "top:-" + bg_t + "px;";
    
    var bgw = $("#background_white"),
        x = [1305+bg_l,1248+bg_l,1191+bg_l,1135+bg_l,1078+bg_l],
        
        y = [200+bg_t,340+bg_t,480+bg_t,620+bg_t,760+bg_t],
        
        step = 1,
        speed = 0,
        currentX = x[cur],
        length = x[cur],
        startTime = (new Date()).getTime(),
        time = startTime,
        animationID,
        bgClip;
    function draw(){
        if (currentX > x[cur+1]) {
            var currentY = (140*(x[cur]-currentX))/57+y[cur];
            bgClip = "-webkit-clip-path: polygon("+x[cur]+"px "+y[cur]+"px, "+currentX+"px "+y[cur]+"px, "+currentX+"px "+currentY+"px);";
        } else {
            bgClip = "-webkit-clip-path: polygon("+x[cur]+"px "+y[cur]+"px, "+currentX+"px "+y[cur]+"px, "+currentX+"px "+y[cur+1]+"px, "+x[cur+1]+"px "+y[cur+1]+"px);";
        }
        
        bgClip += bg_w + bg_l_str + bg_h + bg_t_str;
        
        /*
        switch(cur)
            {
                case 0:
                    var trajectory_Y = (140*(1305-currentX))/57+200;
                    var currentY = (currentX > 1248) ? trajectory_Y : 340;
                    bgClip = "-webkit-clip-path: polygon(1305px 200px, " + currentX + "px 200px, " + currentX + "px "+currentY+"px, 1248px "+currentY+"px)";
                    break;
                case 1:
                    var trajectory_Y = (140*(1248-currentX))/57+340;
                    var currentY = (currentX > 1191) ? trajectory_Y : 480;
                    bgClip = "-webkit-clip-path: polygon(1248px 340px, " + currentX + "px 340px, " + currentX + "px "+currentY+"px, 1191px "+currentY+"px)";
                    break;
                case 2:
                    var trajectory_Y = (140*(1191-currentX))/57+480;
                    var currentY = (currentX > 1135) ? trajectory_Y : 620;
                    bgClip = "-webkit-clip-path: polygon(1191px 480px, " + currentX + "px 480px, " + currentX + "px "+currentY+"px, 1135px "+currentY+"px)";
                    break;
                case 3:
                    var trajectory_Y = (140*(1135-currentX))/57+620;
                    var currentY = (currentX > 1078) ? trajectory_Y : 760;
                    bgClip = "-webkit-clip-path: polygon(1135px 620px, " + currentX + "px 620px, " + currentX + "px "+currentY+"px, 1078px "+currentY+"px)";
                    break;
            }
        */
        
        /*
        x[cur] = currentX;
        bgClip = "-webkit-clip-path: polygon(1305px 200px, " + x[0] + "px 200px, " + x[0] + "px 340px, 1248px 340px, " + x[1] + "px 340px, " + x[1] + "px 480px, 1191px 480px, " + x[2] + "px 480px, " + x[2] + "px 620px, 1135px 620px, " + x[3] + "px 620px, " + x[3] + "px 760px, 1078px 760px)";
        */
        
        bgw.hide();
        bgw.attr("style", bgClip);
        bgw.css("visibility","visible");
    };
    function instance(){  
        speed = (new Date()).getTime() - time;
        step = currentX * speed / Math.abs(300 - ((new Date()).getTime() - startTime));
        currentX -= step;
        if (currentX <= 0){
            currentX = 0;
            cancelAnimationFrame(animationID);
            draw();
            return;
        }
        draw();
        time = (new Date()).getTime();
        animationID = requestAnimationFrame(instance);
    };
    this.run = function(){
        animationID = requestAnimationFrame(instance);
    }
    this.stop = function(){
        currentX = 0;
        cancelAnimationFrame(animationID);
        draw();
    }
    
};

/*

var animateClip = function(cur){
    var bgw = $("#background_white"),
        x = [1305,1248,1191,1135],
        step = 1,
        speed = 0,
        currentX = x[cur],
        length = x[cur],
        startTime = (new Date()).getTime(),
        time = startTime,
        animationID,
        bgClip;
    function draw(){
        x[cur] = currentX;
        bgClip = "-webkit-clip-path: polygon(1305px 200px, " + x[0] + "px 200px, " + x[0] + "px 340px, 1248px 340px, " + x[1] + "px 340px, " + x[1] + "px 480px, 1191px 480px, " + x[2] + "px 480px, " + x[2] + "px 620px, 1135px 620px, " + x[3] + "px 620px, " + x[3] + "px 760px, 1078px 760px)";
        bgw.hide();
        bgw.attr("style", bgClip);
        bgw.css("display","block");
    };
    function instance(){  
        speed = (new Date()).getTime() - time;
        step = currentX * speed / Math.abs(300 - ((new Date()).getTime() - startTime));
        currentX -= step;
        if (currentX <= 0){
            currentX = 0;
            cancelAnimationFrame(animationID);
            draw();
            return;
        }
        draw();
        time = (new Date()).getTime();
        animationID = requestAnimationFrame(instance);
    };
    this.stop = function(){
        currentX = 0;
        cancelAnimationFrame(animationID);
        draw();
    }
    animationID = requestAnimationFrame(instance);
};
*/