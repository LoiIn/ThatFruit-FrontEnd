$(document).ready(function () {

    chooseViewType();

    function chooseViewType(){
        changeViewType();
        $(".view_type").click(function (e) { 
            $(".view_type").attr("data-color", "false");
            $(this).attr("data-color", "true");
            changeColorViewTypeIcon();
            changeViewType();
        });
    }

    // thay đổi cách hiển thị danh sách các sản phẩm
    changeColorViewTypeIcon();
    function changeColorViewTypeIcon(){
        let view_type = $(".view_type");
        for(i = 0; i <  view_type.length; i ++){
            if($(view_type[i]).attr("data-color") == "true"){
                $(view_type[i]).css("color", "#D57E67");
            }else{
                $(view_type[i]).css("color", "#777777");
            } 
        }
    }

    function changeViewType(){
        if($("#box_view").attr("data-color") == "true"){
            $("#fruits_view_1").css("display","none");
            $("#fruits_view_2").css("display","block");
        }else{
            $("#fruits_view_2").css("display","none");
            $("#fruits_view_1").css("display","block");
        }
    }
   

});

