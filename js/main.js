;window.onload = function(){
    
    // Остановка полигональной анимации (что бы не грузить проц, пока ее не видно)
    pJSDom[0].pJS.particles.move.enable = false;
    
    
    var isBusy = true,
        isDrawn_svg_line = false,
        scaleRate,
        bgw, bgl, bgh, bgt,
        page_3_state = false;
    
    //////////////////////////////////////////
    var initializeComponents = function(){
    
        $('#particles-js').css('height',document.documentElement.clientHeight);

        var aspectRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;

        if (aspectRatio >= 16/9) {
            scaleRate = document.documentElement.clientHeight/1080;

            if($('#page_3').hasClass('page_on_bottom'))
                $('#page_3').removeClass('page_on_bottom');
            if($('#page_3').hasClass('page_on_top') == false)
                $('#page_3').addClass('page_on_top');

            $('#svg_line').attr('width','1387px');
            $('#svg_line').attr('height','1080px');
            $('#svg_line_path').attr('d','M1386.5 -1 L947 1081');

            $('#svg_logo_left_div').css('top',259*scaleRate+'px');
            $('#svg_logo_right_div').css('top',259*scaleRate+'px');
            $('#svg_logo_long_lines').attr('width','667px');
            $('#svg_logo_long_lines').attr('height','1080px');
            $($('.svg_logo_paths')[1]).attr('d',"M156.6 1081 L492 260");
            $($('.svg_logo_paths')[0]).attr('d',"M582 -1 L392 466");
            $('#svg_logo_long_lines').css('left',(scaleRate * 796 + (document.documentElement.clientWidth - 1920 * scaleRate) / 2) + 'px');
        }
        else {
            scaleRate = document.documentElement.clientWidth/1920;

            if($('#page_3').hasClass('page_on_top'))
                $('#page_3').removeClass('page_on_top');
            if($('#page_3').hasClass('page_on_bottom') == false)
                $('#page_3').addClass('page_on_bottom');

            $('#svg_logo_left_div').css('top',(document.documentElement.clientHeight - 1080*scaleRate)/2+259*scaleRate+'px');
            $('#svg_logo_right_div').css('top',(document.documentElement.clientHeight - 1080*scaleRate)/2+259*scaleRate+'px');
            
            var tmp_w = document.documentElement.clientWidth,
                tmp_h = document.documentElement.clientHeight;
            $('#svg_line').attr('width',tmp_w/scaleRate+'px');
            $('#svg_line').attr('height',tmp_h/scaleRate+'px');
            var tmp_page_top = (document.documentElement.clientHeight - 1080 * scaleRate) / 2,
                tmp_delta_x = ((tmp_page_top/scaleRate) * 57) / 140;
            $('#svg_line_path').attr('d','M'+(1386.5+tmp_delta_x)+' -1 L'+(947-tmp_delta_x)+' '+(tmp_h/scaleRate+1));

            $('#svg_logo_long_lines').attr('width',tmp_w/scaleRate+'px');
            $('#svg_logo_long_lines').attr('height',tmp_h/scaleRate+'px');
            var topY_1 = (tmp_h - tmp_page_top) / scaleRate - 820,
                topX_1 = 492+796,
                lowY_1 = tmp_h/scaleRate+1,
                lowX_1 = (492*821-(lowY_1-topY_1)*335.4)/821+796,
                bottomY = (tmp_h-tmp_page_top)/scaleRate-614+1,
                topX = (bottomY+1)*(190/467)+392+796;
            $($('.svg_logo_paths')[1]).attr('d',"M" + lowX_1 + " " + lowY_1 + " L" + topX_1 + " " + topY_1);
            $($('.svg_logo_paths')[0]).attr('d',"M"+topX+" -1 L"+(392+796)+" "+bottomY);
            $('#svg_logo_long_lines').css('left','0');
        }

        $(".wrap").css('height',document.documentElement.clientHeight.toString());
        $("#background_color").css('height',document.documentElement.clientHeight.toString());

        $('#menu').css('transform-origin','left top');
        $('#svg_menu_lines').css('transform-origin','left top');
        $('#svg_line').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#menu').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#svg_menu_lines').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');

        $('#menu').css('left', scaleRate * 70 + 'px');
        $('#menu').css('top', scaleRate * 50 + 'px');
        $('#svg_menu_lines_div').css('left', scaleRate * 200 + 'px');
        $('#svg_menu_lines_div').css('top', scaleRate * 50 + 'px');

        
        var page_left = (document.documentElement.clientWidth - 1920 * scaleRate) / 2;
        $('#page_2').css('left', page_left + 'px');
        $('#page_3').css('left', page_left + 'px');
        $('#svg_line').css('left', page_left + 'px');
        
        var page_top = (document.documentElement.clientHeight - 1080 * scaleRate) / 2;
        $('#page_2').css('top', page_top + 'px');
        $('#page_3').css('top', page_top + 'px');
        $('#page_2').css('transform-origin','left top');
        $('#page_3').css('transform-origin','left top');
        $('#svg_line').css('transform-origin','left top');
        
        $('#page_2').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#page_3').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        
        bgw = "width:" + (document.documentElement.clientWidth / scaleRate) + "px;";
        bgl = "left:-" + (page_left / scaleRate) + "px;";
        bgh = "height:" + (document.documentElement.clientHeight / scaleRate) + "px;";
        bgt = "top:-" + (page_top / scaleRate) + "px;";
        
        $("#page_content").
        css("width", (1305 + page_left / scaleRate) + "px").
        css("left","-" + (page_left / scaleRate) + "px").
        css("-webkit-clip-path","polygon(0 0, "+(1386+page_left / scaleRate)+"px 0, "+(947+page_left / scaleRate)+"px 1080px, 0 1080px)");
        $("#content").css("left",(page_left / scaleRate) / 2 + "px");
        var about_top = 420-document.getElementById('face').clientHeight/2;
        $("#face").css("top", about_top + "px");
        $("#about_text").css("top", about_top + "px");
        
        /*
        $("#content_background_color_mask").css("width",(document.documentElement.clientWidth / scaleRate) + "px");
        $("#content_background_color_mask").css("height",(document.documentElement.clientHeight / scaleRate) + "px");
        $("#content_background_color_mask").css("left","-" + (page_left / scaleRate) + "px");
        $("#content_background_color_mask").css("top","-" + (page_top / scaleRate) + "px");
        */
        $('#svg_logo_left').css('transform-origin','left top');
        $('#svg_logo_right').css('transform-origin','left top');
        $('#svg_logo_long_lines').css('transform-origin','left top');
        $('#svg_logo_left').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#svg_logo_right').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#svg_logo_long_lines').css('transform','scale(' + scaleRate + ',' + scaleRate + ')');
        $('#svg_logo_left_div').css('left',(scaleRate * 1164 + page_left) + 'px');
        $('#svg_logo_right_div').css('left',(scaleRate * 1164 + page_left) + 'px');

        $('#svg_logo_left_div').css('width',Math.round(300*scaleRate)+'px');
        $('#svg_logo_right_div').css('width',Math.round(300*scaleRate)+'px');
        $('#svg_logo_left_div').css('height',Math.round(210*scaleRate)+'px');
        $('#svg_logo_right_div').css('height',Math.round(210*scaleRate)+'px');
        $('#svg_menu_lines_div').css('width',Math.round(42*scaleRate)+'px');
        $('#svg_menu_lines_div').css('height',Math.round(76*scaleRate)+'px');

        // Инициализация пути основной линии
        $('#svg_line_path').css("stroke-dasharray","0");
        $('#svg_line_path').css("stroke-dashoffset","0");
        
        if (page_3_state){
            var p_left_tmp = ((document.documentElement.clientWidth - 1920 * scaleRate) / 2) / scaleRate,
                p_top_tmp = ((document.documentElement.clientHeight - 1080 * scaleRate) / 2) / scaleRate,
                x_tmp = 1305 - (57*(document.documentElement.clientHeight/scaleRate-200-p_top_tmp))/140,
                bgClip_tmp = "-webkit-clip-path: polygon("+(1305+p_left_tmp)+"px "+(200+p_top_tmp)+"px, 0 "+(200+p_top_tmp)+"px, 0 " + (document.documentElement.clientHeight/scaleRate) + "px, "+(x_tmp+p_left_tmp)+"px " + (document.documentElement.clientHeight/scaleRate) + "px);";
            $("#content_background_white").attr("style", bgClip_tmp+bgw+bgl+bgh+bgt+"visibility:visible;");
        }
        
        switch(currentContent)
        {
            case "about":
                document.getElementById("menu_item_clipPath_text").setAttribute("x",(950+page_left/scaleRate).toString());
                break;
            case "works":
                document.getElementById("menu_item_clipPath_text").setAttribute("x",(950+page_left/scaleRate).toString());
                break;
            case "clients":
                document.getElementById("menu_item_clipPath_text").setAttribute("x",(910+page_left/scaleRate).toString());
                break;
            case "contacts":
                document.getElementById("menu_item_clipPath_text").setAttribute("x",(800+page_left/scaleRate).toString());
                break;
        }
    };
    
    for(i = 0; i < 4; i++){
        $(".page_svg_menu_items").eq(i).addClass("menu_items_is_left");
    }
    $('#ct_works_info_download').addClass('download_closed');
    $('#ct_contacts_info_phone').addClass('phone_closed');
    $('#ct_contacts_info_mail').addClass('mail_closed');
    $("#svg_menu").addClass('svg_menu_hidden');
    //////////////////////////////////////////
    
    initializeComponents();
    
    jQuery(window).on('resize', initializeComponents);
    
    //////////////////////////////////////////
    
    // Инициализация путей логотипа
    var logoPaths = document.getElementsByClassName("svg_logo_paths");
    for (i = 0; i < logoPaths.length; i++){
        pathInit(logoPaths[i]);
    }
    document.getElementById("svg_logo_left_div").style.opacity = "1";
    document.getElementById("svg_logo_right_div").style.opacity = "1";
    document.getElementById("svg_logo_long_lines").style.opacity = "1";
    
    // Инициализация путей кнопки меню
    var menuPaths = document.getElementsByClassName("svg_menu_paths");
    for (i = 0; i < menuPaths.length; i++){
        pathInit(menuPaths[i]);
    }
        
    // Инициализация пути основной линии
    var mainLine = document.getElementById("svg_line_path");
    
    // Инициализация путей полос контента
    var works_line = document.getElementById("ct_works_svg_path"),
        contacts_line = document.getElementById("ct_contacts_svg_path");
    pathInit(works_line);
    pathInit(contacts_line);
    
    // Отрисовка логотипа
    drawPath(logoPaths[0], 1000, function(){
        logoPaths[2].style.strokeDasharray = 0;
        logoPaths[2].style.strokeDashoffset = 0;
        drawPath(logoPaths[0], 1000, "inverted");
    });
    drawPath(logoPaths[1], 1000, function(){
        logoPaths[5].style.strokeDasharray = 0;
        logoPaths[5].style.strokeDashoffset = 0;
        drawPath(logoPaths[1], 1000, "inverted");
        drawPath(logoPaths[6], 1000, function(){
            drawPath(logoPaths[7], 2000, function(){
                drawPath(logoPaths[8], 1000);
            });
            drawPath(logoPaths[3], 500, function(){
                drawPath(logoPaths[9], 1000, function(){
                    drawPath(logoPaths[4], 1000, function(){
                        $("#svg_logo_img_left").animate({opacity:1}, 2000);
                        $("#svg_logo_img_right").animate({opacity:1}, 2000);
                        setTimeout(function(){
                            $("#svg_logo_text_1").animate({opacity:1}, 1500);
                            setTimeout(function(){
                                $("#svg_logo_text_2").animate({opacity:1}, 1500);
                                $('#svg_logo_long_lines').css('visibility','hidden');
                                setTimeout(function(){
                                    // Запуск полигональной анимации
                                    pJSDom[0].pJS.particles.move.enable = true;
                                    pJSDom[0].pJS.fn.particlesRefresh();
                                    $("#particles-js").animate({opacity:1}, 1500, function(){
                                        $("#svg_menu_lines_div").css("visibility","visible");
                                        $("#menu").css("visibility","visible");
                                        drawPath(menuPaths[0], 500, function(){
                                            $("#svg_menu_text").css("opacity","1");
                                            $("#svg_menu").removeClass('svg_menu_hidden')
                                            $("#svg_menu").addClass('svg_menu_slide_reveal');
                                            setTimeout(function(){
                                                $("#svg_menu").removeClass('svg_menu_slide_reveal');
                                                $("#svg_menu").addClass('svg_menu_shown');
                                                isBusy = false;
                                            }, 1000);
                                        });
                                    });
                                }, 500);
                            }, 500);
                        }, 500);
                    });
                });
            });
        });
    });
    
///////////////////////////////////////////////////////////////////////////////////
    
    var currentPageId = "page_1";
    
    var leaveMain = function(){
        $("#svg_line").css("opacity","1");
        pathInit(mainLine);
        drawPath(mainLine, 1500);
        setTimeout(function(){
            $("#svg_logo_left_div").addClass("animated fadeOutLeft");
            $("#svg_logo_right_div").addClass("animated fadeOutRight");
            setTimeout(function(){
                $("#page_1").addClass("animated fadeOut");
                $("#particles-js").animate({opacity:0},1000);
                setTimeout(function(){
                    pJSDom[0].pJS.particles.move.enable = false;
                    $("#page_1").hide().removeClass("animated fadeOut");
                    $("#svg_logo_left_div").removeClass("animated fadeOutLeft").hide();
                    $("#svg_logo_right_div").removeClass("animated fadeOutRight").hide();
                    isDrawn_svg_line = true;
                }, 500);
            }, 500);
        }, 500);
    };
    
    
    var loadMain = function(){
        pathInit(mainLine);
        drawPath(mainLine, 1500, "inverted");
        $("#page_1").show();
        $("#particles-js").animate({opacity:1},1000);
        pJSDom[0].pJS.particles.move.enable = true;
        pJSDom[0].pJS.fn.particlesRefresh();
        $("#page_1").addClass("animated fadeIn");
        setTimeout(function(){
            $("#svg_logo_left_div").show().addClass("animated fadeInLeft");
            $("#svg_logo_right_div").show().addClass("animated fadeInRight");
            setTimeout(function(){
                $("#svg_line").css("opacity","0");
                drawPath(menuPaths[1], 500, "inverted", function(){
                    $("#svg_logo_left_div").removeClass("animated fadeInLeft");
                    $("#svg_logo_right_div").removeClass("animated fadeInRight");
                    $("#page_1").removeClass("animated fadeIn");
                    currentPageId = "page_1";
                    isBusy = false;
                    isDrawn_svg_line = false;
                });                
            }, 500);
        }, 500);
    };
    
    
    var loadMenu = function(){
        document.getElementById("page_2").style.display = "block";
        var menuItems = $(".svg_menu_items");
        menuItems.eq(0).css("visibility","visible").addClass("animated slideInRight");
        setTimeout(function(){
            menuItems.eq(1).css("visibility","visible").addClass("animated slideInRight");
            setTimeout(function(){
                menuItems.eq(2).css("visibility","visible").addClass("animated slideInRight");
                setTimeout(function(){
                    menuItems.eq(3).css("visibility","visible").addClass("animated slideInRight");
                    setTimeout(function(){
                        if(currentPageId != "page_3") 
                            drawPath(menuPaths[1], 500);
                        setTimeout(function(){
                            for(i = 0; i < 4; i++){
                                menuItems.eq(i).removeClass("animated slideInRight");
                                currentPageId = "page_2";
                                
                            }
                            isBusy = false;
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    };
    
    var leaveMenu = function(){
        if (highlightAnimation != undefined)
            highlightAnimation.stop();
        document.getElementById("background_color_mask").setAttribute("style",bgw+bgl+bgh+bgt);
        document.getElementById("background_white").setAttribute("style",bgw+bgl+bgh+bgt);
        document.getElementById("background_color_mask").style.visibility = "hidden";
        document.getElementById("background_white").style.visibility = "hidden";
        var menuItems = $(".svg_menu_items");
        menuItems.eq(0).addClass("animated slideOutRight");
        setTimeout(function(){
            menuItems.eq(1).addClass("animated slideOutRight");
            setTimeout(function(){
                menuItems.eq(2).addClass("animated slideOutRight");
                setTimeout(function(){
                    menuItems.eq(3).addClass("animated slideOutRight");
                    setTimeout(function(){
                        for(i = 0; i < 4; i++){
                            menuItems.eq(i).removeClass("animated slideOutRight").css("visibility","hidden");
                            document.getElementById("page_2").style.display = "none";
                        }
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    };
    
    var loadPage = function(item){
        document.getElementById("page_3").style.display = "block";
        var menuItems = $(".page_svg_menu_items");
        menuItems.eq(0).css("visibility","visible").addClass("animated slideInLeft");
        setTimeout(function(){
            menuItems.eq(1).css("visibility","visible").addClass("animated slideInLeft");
            setTimeout(function(){
                menuItems.eq(2).css("visibility","visible").addClass("animated slideInLeft");
                setTimeout(function(){
                    menuItems.eq(3).css("visibility","visible").addClass("animated slideInLeft");
                    setTimeout(function(){
                            for(i = 0; i < 4; i++){
                                menuItems.eq(i).removeClass("animated slideInLeft");
                                currentPageId = "page_3";
                                isBusy = false;
                            }
                    }, 1000);
                }, 500);
            }, 500);
        }, 500);
        
        function anim(){
            var bg_w = $("#content_background_white"),
                y = 0,
                x = 0,
                step = 1,
                speed = 0,
                startTime = (new Date()).getTime(),
                time = startTime,
                animationID,
                bgClip,
                p_left = ((document.documentElement.clientWidth - 1920 * scaleRate) / 2) / scaleRate,
                p_top = ((document.documentElement.clientHeight - 1080 * scaleRate) / 2) / scaleRate,
                length = document.documentElement.clientHeight/scaleRate-200-p_top;
            function draw(){
                bgClip = "-webkit-clip-path: polygon("+(1305+p_left)+"px "+(200+p_top)+"px, 0 "+(200+p_top)+"px, 0 " + (200+y+p_top) + "px, "+(1305-x+p_left)+"px " + (200+y+p_top) + "px);";
                bg_w.hide();
                bg_w.attr("style", bgClip+bgw+bgl+bgh+bgt);
                bg_w.css("visibility","visible");
            };
            function instance(){  
                speed = (new Date()).getTime() - time;
                step = (length - y) * speed / Math.abs(3000 - ((new Date()).getTime() - startTime));
                y += step;
                x = (57*y)/140;
                if (y >= length){
                    y = length;
                    x = (57*y)/140;
                    cancelAnimationFrame(animationID);
                    draw();
                    return;
                }
                draw();
                time = (new Date()).getTime();
                animationID = requestAnimationFrame(instance);
            };
            animationID = requestAnimationFrame(instance);  
        };
        
        setTimeout(function(){
            anim();
        }, 200);
        
        setTimeout(function(){
            loadContent(item);
            cross(item);
            page_3_state = true;
        }, 2500);
    };
    
    var leavePage = function(){

        unloadContent();
        
        var menuItems = $(".page_svg_menu_items");
        menuItems.eq(3).css("visibility","visible").addClass("animated slideOutLeft");
        setTimeout(function(){
            menuItems.eq(2).css("visibility","visible").addClass("animated slideOutLeft");
            setTimeout(function(){
                menuItems.eq(1).css("visibility","visible").addClass("animated slideOutLeft");
                setTimeout(function(){
                    menuItems.eq(0).css("visibility","visible").addClass("animated slideOutLeft");
                    setTimeout(function(){
                            for(i = 0; i < 4; i++){
                                menuItems.eq(i).css("visibility","hidden").removeClass("animated slideOutLeft");
                                document.getElementById("page_3").style.display = "none";
                            }
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
        
        function anim(){
            var bg_w = $("#content_background_white"),
                step = 1,
                speed = 0,
                startTime = (new Date()).getTime(),
                time = startTime,
                animationID,
                bgClip,
                p_left = ((document.documentElement.clientWidth - 1920 * scaleRate) / 2) / scaleRate,
                p_top = ((document.documentElement.clientHeight - 1080 * scaleRate) / 2) / scaleRate,
                x = 0,
                y = document.documentElement.clientHeight/scaleRate-200-p_top;
            function draw(){
                bgClip = "-webkit-clip-path: polygon("+(1305+p_left)+"px "+(200+p_top)+"px, 0 "+(200+p_top)+"px, 0 " + (200+y+p_top) + "px, "+(1305-x+p_left)+"px " + (200+y+p_top) + "px);";
                bg_w.hide();
                bg_w.attr("style", bgClip+bgw+bgl+bgh+bgt);
                bg_w.css("visibility","visible");
            };
            function instance(){  
                speed = (new Date()).getTime() - time;
                step = y * speed / Math.abs(1500 - ((new Date()).getTime() - startTime));
                y -= step;
                x = (57*y)/140;
                if (y <= 0){
                    y = 0;
                    cancelAnimationFrame(animationID);
                    draw();
                    return;
                }
                draw();
                time = (new Date()).getTime();
                animationID = requestAnimationFrame(instance);
            };
            animationID = requestAnimationFrame(instance);  
        };
        setTimeout(function(){
            anim();
            page_3_state = false;
        }, 200);
        $('#crossLine').css("visibility","hidden");
    };
    
////////////////////////////////////////////////////////////////////////////////////
    

    
    var about_text_animation = function(){
            var about_text = $("#about_text"),
                step = 1,
                length = 100,
                speed = 0,
                startTime = (new Date()).getTime(),
                time = startTime,
                animationID,
                a1 = -30,
                a2 = 0;
        
            function draw(){
                var a11 = (a1<0) ? 0 : a1;
                about_text.attr("style","-webkit-mask-image:linear-gradient(to bottom, rgba(0, 0, 0, 1) "+a1+"%, rgba(0, 0, 0, 0) "+a2+"%)");
            };
        
            function instance(){  
                speed = (new Date()).getTime() - time;
                step = (length - a1) * speed / Math.abs(1500 - ((new Date()).getTime() - startTime));
                a1+=step;
                a2+=step;
                if (a1 >= length){
                    a1 = a2 = length;
                    cancelAnimationFrame(animationID);
                    draw();
                    return;
                }
                draw();
                time = (new Date()).getTime();
                animationID = requestAnimationFrame(instance);
            };
            
            animationID = requestAnimationFrame(instance);  
        };
        
    
    
////////////////////////////////////////////////////////////////////////////////////
    
    var currentContent;
    
    var loadContent = function(item){
        
        $("#content_background_color_mask").css("visibility","visible");
        
        var content_path;
        $("#ct_"+item).css("display","block");
        
        var page_left = (document.documentElement.clientWidth/scaleRate-1920)/2;
        
        
        
        setTimeout(function(){
            document.getElementById("menu_item_clipPath_text").innerHTML = item;
            switch(item)
                {
                    case "about":
                        document.getElementById("menu_item_clipPath_text").setAttribute("x",(950+page_left).toString());
                        $("#about_text").hide();
                        $("#about_text_postfix").hide();
                        $("#ct_"+item).css("opacity","1");
                        
                        if ($("#face").hasClass('animated fadeInLeft'))
                            $("#face").removeClass('animated fadeInLeft');
                        $("#face").addClass('animated fadeInLeft');  
                        if ($("#about_text_prefix").hasClass('animated fadeInRight'))
                            $("#about_text_prefix").removeClass('animated fadeInRight');
                        $("#about_text_prefix").addClass('animated fadeInRight');  
                        setTimeout(function(){
                            $("#about_text").show();
                            about_text_animation();
                            setTimeout(function(){
                                $("#about_text_postfix").show();
                                if ($("#about_text_postfix").hasClass('animated fadeInRight'))
                                    $("#about_text_postfix").removeClass('animated fadeInRight');
                                $("#about_text_postfix").addClass('animated fadeInRight');  
                            },1000);
                        },500);
                        break;
                        
                    case "works":
                       
                        if ($("#ct_works_info_download").hasClass('download_closed'))
                            $("#ct_works_info_download").removeClass('download_closed');
                        if ($("#ct_works_info_download").hasClass('download_open'))
                            $("#ct_works_info_download").removeClass('download_open');
                        $("#ct_works_info_download").addClass('download_hidden');
                        if ($("#ct_works_text").hasClass('ct_works_text_open'))
                            $("#ct_works_text").removeClass('ct_works_text_open');
                        $("#ct_works_text").addClass('ct_works_text_hidden');
                         document.getElementById("menu_item_clipPath_text").setAttribute("x",(950+page_left).toString());
                        $("#ct_"+item).css("opacity","1");
                        drawPath(works_line,500,"reversed",function(){
                            
                            if ($("#ct_works_info_download").hasClass('download_hidden'))
                                $("#ct_works_info_download").removeClass('download_hidden');
                            $("#ct_works_info_download").addClass('download_slide_reveal');
                            setTimeout(function(){
                                $("#ct_works_info_download").addClass('download_closed');
                                $("#ct_works_info_download").removeClass('download_slide_reveal');
                            },500);
                            if ($("#ct_works_text").hasClass('ct_works_text_hidden'))
                                $("#ct_works_text").removeClass('ct_works_text_hidden');
                            $("#ct_works_text").addClass('ct_works_text_slide_out');
                            setTimeout(function(){
                                $("#ct_works_text").addClass('ct_works_text_open');
                                $("#ct_works_text").removeClass('ct_works_text_slide_out');
                            },1000);
                        });
                        break;
                        
                    case "clients":
                        document.getElementById("menu_item_clipPath_text").setAttribute("x",(910+page_left).toString());
                        $("#ct_"+item).css("opacity","1");
                        var clients_img = $("#ct_clients").children();
                        var clients_img_clear = function(i){
                            if ($(clients_img[i]).hasClass('animated fadeInRight'))
                                $(clients_img[i]).removeClass('animated fadeInRight');
                            $(clients_img[i]).hide();
                        };
                        for (i = 0; i < 6; i++) {
                            clients_img_clear(i);
                        }
                        $(clients_img[0]).show().addClass('animated fadeInRight');
                        setTimeout(function(){
                            $(clients_img[1]).show().addClass('animated fadeInRight');
                            setTimeout(function(){
                                $(clients_img[2]).show().addClass('animated fadeInRight');
                                setTimeout(function(){
                                    $(clients_img[3]).show().addClass('animated fadeInRight');
                                    setTimeout(function(){
                                        $(clients_img[4]).show().addClass('animated fadeInRight');
                                        setTimeout(function(){
                                            $(clients_img[5]).show().addClass('animated fadeInRight');
                                    },300);
                                    },300);
                                },300);
                            },300);
                        },300);
                        break;
                        
                    case "contacts":
                        if ($("#ct_contacts_info_phone").hasClass('phone_closed'))
                            $("#ct_contacts_info_phone").removeClass('phone_closed');
                        if ($("#ct_contacts_info_phone").hasClass('phone_open'))
                            $("#ct_contacts_info_phone").removeClass('phone_open');
                        $("#ct_contacts_info_phone").addClass('phone_hidden');
                        if ($("#ct_contacts_info_mail").hasClass('mail_closed'))
                            $("#ct_contacts_info_mail").removeClass('mail_closed');
                        if ($("#ct_contacts_info_mail").hasClass('mail_open'))
                            $("#ct_contacts_info_mail").removeClass('mail_open');
                        $("#ct_contacts_info_mail").addClass('mail_hidden');
                        
                        if ($("#ct_contacts_text").hasClass('ct_contacts_text_open'))
                            $("#ct_contacts_text").removeClass('ct_contacts_text_open');
                        $("#ct_contacts_text").addClass('ct_contacts_text_hidden');
                        
                        document.getElementById("menu_item_clipPath_text").setAttribute("x",(800+page_left).toString());
                        $("#ct_"+item).css("opacity","1");
                        drawPath(contacts_line,500,"reversed",function(){
                            if ($("#ct_contacts_info_phone").hasClass('phone_hidden'))
                                $("#ct_contacts_info_phone").removeClass('phone_hidden');
                            $("#ct_contacts_info_phone").addClass('phone_slide_reveal');
                            if ($("#ct_contacts_info_mail").hasClass('mail_hidden'))
                                $("#ct_contacts_info_mail").removeClass('mail_hidden');
                            $("#ct_contacts_info_mail").addClass('mail_slide_reveal');
                            setTimeout(function(){
                                $("#ct_contacts_info_phone").addClass('phone_closed');
                                $("#ct_contacts_info_phone").removeClass('phone_slide_reveal');
                                $("#ct_contacts_info_mail").addClass('mail_closed');
                                $("#ct_contacts_info_mail").removeClass('mail_slide_reveal');
                            },500);
                            
                            if ($("#ct_contacts_text").hasClass('ct_contacts_text_hidden'))
                                $("#ct_contacts_text").removeClass('ct_contacts_text_hidden');
                            $("#ct_contacts_text").addClass('ct_contacts_text_slide_out');
                            setTimeout(function(){
                                $("#ct_contacts_text").addClass('ct_contacts_text_open');
                                $("#ct_contacts_text").removeClass('ct_contacts_text_slide_out');
                            },1000);
                        });
                        break;
                }
            $("#content_background_color_mask").addClass("animated slideInRight");
        }, 10);
        
        //$("#ct_"+item).css("display","block");
        //$("#ct_"+item).animate({opacity:1},500);
        
        currentContent = item;
    };
    
    var unloadContent = function(){
        if (currentContent != undefined){
            $("#ct_"+currentContent).stop().css("opacity","0").css("display","none");
            $("#content_background_color_mask").css("visibility","hidden");
            $("#content_background_color_mask").removeClass("animated slideInRight");
            document.getElementById("menu_item_clipPath_text").innerHTML = "";
            if(currentContent === "works") {
                var item = document.getElementById("ct_works_info_download");
                if (item.classList.contains("download_slide_in"))
                    item.classList.remove("download_slide_in");
                if (item.classList.contains("download_slide_out"))
                    item.classList.remove("download_slide_out");
                if (item.classList.contains("download_open"))
                    item.classList.remove("download_open");
                if (item.classList.contains("download_closed") == false)
                    item.classList.add("download_closed");
                document.getElementById("ct_works_info_download_img").style.visibility = "visible";
            }
            if(currentContent === "contacts") {
                var item = document.getElementById("ct_contacts_info_phone");
                if (item.classList.contains("phone_slide_in"))
                    item.classList.remove("phone_slide_in");
                if (item.classList.contains("phone_slide_out"))
                    item.classList.remove("phone_slide_out");
                if (item.classList.contains("phone_open"))
                    item.classList.remove("phone_open");
                if (item.classList.contains("phone_closed") == false)
                    item.classList.add("phone_closed");
                document.getElementById("ct_contacts_info_phone_img").style.visibility = "visible";
                item = document.getElementById("ct_contacts_info_mail");
                if (item.classList.contains("mail_slide_in"))
                    item.classList.remove("mail_slide_in");
                if (item.classList.contains("mail_slide_out"))
                    item.classList.remove("mail_slide_out");
                if (item.classList.contains("mail_open"))
                    item.classList.remove("mail_open");
                if (item.classList.contains("mail_closed") == false)
                    item.classList.add("mail_closed");
                document.getElementById("ct_contacts_info_mail_img").style.visibility = "visible";
            }
        }
    };
    
////////////////////////////////////////////////////////////////////////////////////  
    
    // Подсветка пунктов меню
    
    var highlightAnimation;
    
    var highlight = function(el){
        
        if($(".svg_menu_items").eq(3).css("visibility") != "visible" && el.parentElement.getAttribute("id") === "menu_buttons")
            return;
        if($(".page_svg_menu_items").eq(3).css("visibility") != "visible" && el.parentElement.getAttribute("id") === "page_menu_buttons")
            return;
        
        var clipPath,
            bgClip,
            textEl;
        
        var curX;
                
        switch(el.getAttribute("id"))
            {
                case "menu_buttons_about":
                    clipPath = "-webkit-clip-path: url(#clipPath_about);";
                    curX = 0;
                    textEl = document.getElementById("svg_menu_about");
                    break;
                case "menu_buttons_works":
                    clipPath = "-webkit-clip-path: url(#clipPath_works);";
                    curX = 1;
                    textEl = document.getElementById("svg_menu_works");
                    break;
                case "menu_buttons_clients":
                    clipPath = "-webkit-clip-path: url(#clipPath_clients);";
                    curX = 2;
                    textEl = document.getElementById("svg_menu_clients");
                    break;
                case "menu_buttons_contacts":
                    clipPath = "-webkit-clip-path: url(#clipPath_contacts);";
                    curX = 3;
                    textEl = document.getElementById("svg_menu_contacts");
                    break;
                    
                case "page_menu_buttons_about":
                    clipPath = "-webkit-clip-path: url(#page_clipPath_about);";
                    textEl = document.getElementById("page_svg_menu_about");
                    break;
                case "page_menu_buttons_works":
                    clipPath = "-webkit-clip-path: url(#page_clipPath_works);";
                    textEl = document.getElementById("page_svg_menu_works");
                    break;
                case "page_menu_buttons_clients":
                    clipPath = "-webkit-clip-path: url(#page_clipPath_clients);";
                    textEl = document.getElementById("page_svg_menu_clients");
                    break;
                case "page_menu_buttons_contacts":
                    clipPath = "-webkit-clip-path: url(#page_clipPath_contacts);";
                    textEl = document.getElementById("page_svg_menu_contacts");
            }
        if (el.parentElement.getAttribute("id") == "page_menu_buttons"){
            document.getElementById("page_background_color_mask").setAttribute("style",clipPath);
            document.getElementById("page_background_color_mask").style.visibility = "visible";
        } else {
            highlightAnimation = new animateClip(curX, scaleRate);
            highlightAnimation.run();
            document.getElementById("background_color_mask").setAttribute("style",clipPath+bgw+bgl+bgh+bgt);
            document.getElementById("background_color_mask").style.visibility = "visible";
        }
        
        el.onmouseout = function(){
            if (el.parentElement.getAttribute("id") == "page_menu_buttons"){
                document.getElementById("page_background_color_mask").style.visibility = "hidden";
                document.getElementById("page_background_color_mask").setAttribute("style","");
            } else {
                highlightAnimation.stop();
                document.getElementById("background_color_mask").setAttribute("style",bgw+bgl+bgh+bgt);
                document.getElementById("background_white").setAttribute("style",bgw+bgl+bgh+bgt);
                document.getElementById("background_color_mask").style.visibility = "hidden";
                document.getElementById("background_white").style.visibility = "hidden";
            }
        }
        
    };
    
    var cross = function(item){
        
        var svg_crossLine = $("#crossLine"),
            path_crossLine = document.getElementById("crossLine_path"),
            item;
        
        switch(item)
            {                    
                case "about":
                    svg_crossLine.css({ "top": "340px", "left": "396px" });
                    path_crossLine.setAttribute("d", "M1 80 L309 80");
                    item = document.getElementsByClassName("page_svg_menu_items")[0];
                    break;
                case "works":
                    svg_crossLine.css({ "top": "481px", "left": "339px" });
                    path_crossLine.setAttribute("d", "M1 80 L311 80");
                    item = document.getElementsByClassName("page_svg_menu_items")[1];
                    break;
                case "clients":
                    svg_crossLine.css({ "top": "622px", "left": "282px" });
                    path_crossLine.setAttribute("d", "M1 80 L338 80");
                    item = document.getElementsByClassName("page_svg_menu_items")[2];
                    break;
                case "contacts":
                    svg_crossLine.css({ "top": "764px", "left": "226px" });
                    path_crossLine.setAttribute("d", "M1 80 L453 80");
                    item = document.getElementsByClassName("page_svg_menu_items")[3];
            }
        
        if (item.classList.contains("menu_items_slide_right"))
                item.classList.remove("menu_items_slide_right");
        if (item.classList.contains("menu_items_slide_left"))
            item.classList.remove("menu_items_slide_left");
        if (item.classList.contains("menu_items_is_right"))
            item.classList.remove("menu_items_is_right");
        if (item.classList.contains("menu_items_is_left") == false)
            item.classList.add("menu_items_is_left");
        
        pathInit(path_crossLine);
        if (svg_crossLine.css("visibility") != "visible")
            svg_crossLine.css("visibility", "visible");
        drawPath(path_crossLine, 500);
    };
    
    var menuFocus = function(el){
        
        var item, thisContent;
        
        switch(el.getAttribute("id"))
            {                    
                case "page_menu_buttons_about":
                    item = document.getElementsByClassName("page_svg_menu_items")[0];
                    if (currentContent === "about")
                        return;
                    thisContent = "about";
                    break;
                case "page_menu_buttons_works":
                    item = document.getElementsByClassName("page_svg_menu_items")[1];
                    if (currentContent === "works")
                        return;
                    thisContent = "works";
                    break;
                case "page_menu_buttons_clients":
                    item = document.getElementsByClassName("page_svg_menu_items")[2];
                    if (currentContent === "clients")
                        return;
                    thisContent = "clients";
                    break;
                case "page_menu_buttons_contacts":
                    item = document.getElementsByClassName("page_svg_menu_items")[3];
                    if (currentContent === "contacts")
                        return;
                    thisContent = "contacts";
            }
        
        if (item.classList.contains("menu_items_slide_left"))
            item.classList.remove("menu_items_slide_left");
        if (item.classList.contains("menu_items_is_left"))
            item.classList.remove("menu_items_is_left");
        item.classList.add("menu_items_slide_right");
        setTimeout(function(){
            item.classList.remove("menu_items_slide_right");
            item.classList.add("menu_items_is_right");
        },500);
        
        el.onmouseout = function(){
            if (item.classList.contains("menu_items_slide_right"))
                item.classList.remove("menu_items_slide_right");
            if (item.classList.contains("menu_items_is_right"))
                item.classList.remove("menu_items_is_right");
            if(currentContent != thisContent) {
                item.classList.add("menu_items_slide_left");
                setTimeout(function(){
                    item.classList.remove("menu_items_slide_left");
                    item.classList.add("menu_items_is_left");
                },500);
            }
        };
    };
    
    var pulse = function(el){
        $(el).addClass("animated pulse");
        $(el).on("mouseout", function(){
            $(el).removeClass("animated pulse");
        });
    };
    
    
    
    var menuBtnFocus = function(){
        $("#svg_menu").toggleClass("svg_menu_slide_right");
        $("#svg_menu").toggleClass("svg_menu_slide_left");
        $("#svg_menu").on("mouseout", function(){
            $("#svg_menu").toggleClass("svg_menu_slide_right");
            $("#svg_menu").toggleClass("svg_menu_slide_left");
        });
    };
    
////////////////////////////////////////////////////////////////////////////////////
    
    // Обработчики
    
    document.getElementById("svg_menu").onclick = function(){
        if(isBusy != true) {
            $("#svg_menu").addClass("animated bounceIn");
                setTimeout(function(){
                    $("#svg_menu").removeClass("animated bounceIn");
                }, 1000);
            if(currentPageId == "page_1") {
                isBusy = true;
                leaveMain();
                setTimeout(loadMenu, 1000);
                return;
            }
            if (currentPageId == "page_2"){
                return;
            }
            if(currentPageId == "page_3") {
                isBusy = true;
                leavePage();
                setTimeout(loadMenu, 1500);
                return;
            }
        }
    };
    
    document.getElementById("svg_menu_lines").onclick = function(){
        if(isBusy != true) {
            
            if(currentPageId == "page_1") {
                return;
            }
            if (currentPageId == "page_2"){
                isBusy = true;
                leaveMenu();
                setTimeout(loadMain, 1500);
                return;
            }
            if(currentPageId == "page_3") {
                isBusy = true;
                leavePage();
                setTimeout(loadMain, 1500);
                return;
            }
        }
    };
    
    document.getElementById("menu_buttons_about").onmouseover = function(){if(isBusy!=true) highlight(this);};
    document.getElementById("menu_buttons_works").onmouseover = function(){if(isBusy!=true) highlight(this);};
    document.getElementById("menu_buttons_clients").onmouseover = function(){if(isBusy!=true) highlight(this);};
    document.getElementById("menu_buttons_contacts").onmouseover = function(){if(isBusy!=true) highlight(this);};
    
    
    document.getElementById("menu_buttons_about").onclick = function(){if(isBusy!=true) {isBusy=true; leaveMenu(); loadPage("about");}};
    document.getElementById("menu_buttons_works").onclick = function(){if(isBusy!=true) {isBusy=true; leaveMenu(); loadPage("works");}};
    document.getElementById("menu_buttons_clients").onclick = function(){if(isBusy!=true) {isBusy=true; leaveMenu(); loadPage("clients");}};
    document.getElementById("menu_buttons_contacts").onclick = function(){if(isBusy!=true) {isBusy=true; leaveMenu(); loadPage("contacts");}};
    
    
    document.getElementById("page_menu_buttons_about").onclick = function(){if(isBusy!=true && currentContent!="about") {cross("about"); unloadContent(); loadContent("about");}};
    document.getElementById("page_menu_buttons_works").onclick = function(){if(isBusy!=true && currentContent!="works") {cross("works"); unloadContent(); loadContent("works");}};
    document.getElementById("page_menu_buttons_clients").onclick = function(){if(isBusy!=true && currentContent!="clients") {cross("clients"); unloadContent(); loadContent("clients");}};
    document.getElementById("page_menu_buttons_contacts").onclick = function(){if(isBusy!=true && currentContent!="contacts") {cross("contacts"); unloadContent(); loadContent("contacts");}};
    
    document.getElementById("page_menu_buttons_about").onmouseover = function(){if(isBusy!=true) menuFocus(this)};
    document.getElementById("page_menu_buttons_works").onmouseover = function(){if(isBusy!=true) menuFocus(this)};
    document.getElementById("page_menu_buttons_clients").onmouseover = function(){if(isBusy!=true) menuFocus(this)};
    document.getElementById("page_menu_buttons_contacts").onmouseover = function(){if(isBusy!=true) menuFocus(this)};
    
    $("#ct_contacts_info_phone_img").on("mouseover", function(){pulse(this)});
    $("#ct_contacts_info_mail_img").on("mouseover", function(){pulse(this)});
    $("#ct_works_info_download_img").on("mouseover", function(){pulse(this)});
    $("#download_text").on("mouseover", function(){
        if(document.getElementById("ct_works_info_download").classList.contains("download_open"))
            pulse(this);
    });
    $("#svg_menu").on("mouseover", function(){menuBtnFocus()});
    $("#svg_menu_lines_div").on("mouseover", function(){pulse(this)});
    
    
    document.getElementById("ct_contacts_info_phone_img").onclick = function(){
        var item = document.getElementById("ct_contacts_info_phone");
        if (item.classList.contains("phone_closed"))
            item.classList.remove("phone_closed");
        if (item.classList.contains("phone_slide_in"))
            item.classList.remove("phone_slide_in");
        item.classList.add("phone_slide_out");
        setTimeout(function(){
            item.classList.remove("phone_slide_out");
            item.classList.add("phone_open");
        },1000);
        document.getElementById("ct_contacts_info_phone_img").style.visibility = "hidden";
    };
    
    document.getElementById("ct_contacts_info_mail_img").onclick = function(){
        var item = document.getElementById("ct_contacts_info_mail");
        if (item.classList.contains("mail_closed"))
            item.classList.remove("mail_closed");
        if (item.classList.contains("mail_slide_in"))
            item.classList.remove("mail_slide_in");
        item.classList.add("mail_slide_out");
        setTimeout(function(){
            item.classList.remove("mail_slide_out");
            item.classList.add("mail_open");
        },1000);
        document.getElementById("ct_contacts_info_mail_img").style.visibility = "hidden";
    };
    
    document.getElementById("ct_works_info_download_img").onclick = function(){
        var item = document.getElementById("ct_works_info_download");
        if (item.classList.contains("download_closed"))
            item.classList.remove("download_closed");
        if (item.classList.contains("download_slide_in"))
            item.classList.remove("download_slide_in");
        item.classList.add("download_slide_out");
        setTimeout(function(){
            item.classList.remove("download_slide_out");
            item.classList.add("download_open");
        },1000);
        document.getElementById("ct_works_info_download_img").style.visibility = "hidden";
    };
    
    /* Подвижный фон
    
    var x, y, dx, dy;
    var top = -25, left = -25;
    var bg1 = document.getElementById("background_color");
    var bg2 = document.getElementById("background_white");
    
    document.body.onmousemove = function(e){
        if (x === undefined || y === undefined) {
            x = e.clientX;
            y = e.clientY;
        } else {
            dx = e.clientX - x;
            dy = e.clientY - y;
            x = e.clientX;
            y = e.clientY;
            if (dy > 0 && top > -50)
                top--;
            else if (dy < 0 && top < 0)
                top++;
            if (dx > 0 && left > -50)
                left--;
            else if (dx < 0 && left < 0)
                left++;
            bg1.style.top = top + "px";
            bg1.style.left = left + "px";
            bg2.style.top = top + "px";
            bg2.style.left = left + "px";
        }
    };
    */
    
};