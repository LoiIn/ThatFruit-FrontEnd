$(document).ready(function () {
    // TODO: an hien vung gio hang
    $(".cart_icon").click(function (e) { 
        e.preventDefault();
        $("html, body").css("overflow", "hidden");
        $("#cart_area2").css("display", "block");
        TweenMax.to($("#cart_area2 #main_"), 1, {right:0,ease: "power4.out"});
    });

    // tro lai trang thai ban dau
    $("#cart_area2 #main_ .fa-times").click(function (e) { 
        e.preventDefault();
        $("#cart_area2").css("display", "none");
        $("html, body").css("overflow", "auto");
    });
    // $("#cart_area2").click(function (e) { 
    //     e.preventDefault();
    //     $("#cart_area2").css("display", "none");
    //     $("html, body").css("overflow", "auto");
    // });

    // TODO: xoa bo san pham trong gio hang
    $("#list_carts .fa-trash").click(function (e) { 
        e.preventDefault();
        $(this).parent().css("display", "none");
    });

    // TODO: an hien phuong thuc thanh toan
    $("#pay_methods input").click(function (e) { 
        $("#pay_methods input").prop("checked",false);
        $(this).prop("checked", true);
        var x = $(this).attr("value");
        var p_arr = $("#pay_methods p");
        $("#pay_methods p").css("display","none");
        $(p_arr[x]).css("display", "block");
        
    });
});