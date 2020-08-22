$(document).ready(function () {

   


    //TODO: 1) slide anh 
    
    
    // $("#zoom_img").ezPlus({
    //     zoomType: 'lens',
    //     lensShape: 'round',
    //     lensSize: 200
    // });

    //TODO: 2) xu ly phan navbar
    // *** Hieu ung khi cuon chuot
    $(window).scroll(function () { 
        change_header();
        return_header();
    });
    var change_header =  function(){
        var flag =  $("html, body").scrollTop();
        if(flag >= 300){
            $("#bottom_bar").addClass("change_header");
        }else{
            $("#bottom_bar").removeClass("change_header");
        }
    }

    // *** Thay doi mau sac cua cac hang muc khi click

    // TODO: 3)List menu che do mobile screen
    $("#bar_media").click(function (e) { 
        e.preventDefault();
        $("html, body").css("overflow", "hidden");
        $("#hidden_header").css("display", "block");
        TweenMax.to($("#hidden_header #main_hh"), 1.5, {left:0,ease: "power4.out"});
    });

    $("#hidden_header .fa-times").click(function (e) { 
        e.preventDefault();
        $("#hidden_header").css("display", "none");
        $("html, body").css("overflow", "auto");
    });

    $(".menu_two_hh").slideUp();

    $("#main_hh ul li").click(function (e) { 
        e.preventDefault();
        $(this).children(".menu_two_hh").slideToggle();
        $(this).children(".fa_chevron").toggleClass("fa-chevron-down");
        $(this).children(".fa_chevron").toggleClass("fa-chevron-up");
    });

    // TODO: tro ve dau trang 
    function return_header(){
        var pos = $("html, body").scrollTop();
        if(pos >= 500){
            $("#return_header").css("display", "block");
        }else{
            $("#return_header").css("display", "none");
        }
    }

    $("#return_header").click(function (e) { 
        e.preventDefault();
        $('body, html').animate({scrollTop: 0},1000);
    });

   
});
