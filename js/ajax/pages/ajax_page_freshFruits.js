var state = {
    certi : "",
    val : "",
    isDesc : false,
    category: "", //loại sản phẩm (trái cây, nước ép hay giỏ quà)
    size: 4  //số lượng sản phẩm tối đa mà trang có thể hiển thị
};

$(function(){
    
    // setSize();
    updateSize();

    showWithLocationHref();

    selectByTitle();
    selectByOrigin();
    sortProducts(); 
    // showPrevOrNext();
})

// Hiển thị ban đầu khi mới vào trang
// 1. Nếu đường link không có tiêu chí gì thêm thì hiển thị tất cả sản phẩm.
// 2. Nếu đường link có thêm các tiêu chí thì hiển thị các sản phẩm ở đường link đó.
function showWithLocationHref(){
    if(location.href.indexOf("=") == -1){
        $("title").html("Trái cây tươi - Thật Fruit");
        getAllProducts().then(function(rs){
            showLists(rs);
        }).catch(err=>console.log(err));
    }else{  
        let arrStr = location.href.split("=");
        state.certi = "title";
        state.val = arrStr[1];
        filterBy(state.certi, state.val ,state.isDesc).then(function(rs){
            showLists(rs);
        })
        $("title").html(`${arrStr[1]} - Thật Fruit`);
        $("#select_row_2 ul li").removeClass("active");
        $(`#select_row_2 ul li[data-title=${arrStr[1]}]`).addClass("active");
    }
}

// Hiển thị kết quả
function showLists(rs){
    if(rs.length == 0) showNull();
    else{
        showType1(rs);
        showType2(rs);
    }
    clickOneFruits();
}


// lọc sản phẩm theo loại sản phẩm
function selectByTitle(){
    $("#select_row_2 ul li").click(function (e) { 
        state.certi = "title";
        e.preventDefault();
        state.val = $(this).children("a").html();
        $("#selection_2 select").val("default");
        $("#select_row_2 ul li").removeClass("active");
        $(this).addClass("active");
        if($(this).index() == 0){
            $("#select_1").css("display","block");
            getAllProducts().then(rs=>{
                showLists(rs);
            }).catch(err=>console.log(err));
        }else{
            $("#select_1").css("display","none");
            filterBy(state.certi,state.val,state.isDesc).then(rs=>{
                showLists(rs);
            }).catch(err=>console.log(err));
        }
        // location.href = url_page + `?${state.certi}=${state.val}`;
        showNameAndLink(`Trái cây tươi / ` + state.val);
    });
    $("#bottom_bar .menu_two ul li").click(function(e){
        state.certi = "title";
        e.preventDefault();
        let text = $(this).attr("data-title");
        state.val = $(this).children("a").html();
        $("#select_1").css("display","none");
        $("#select_row_2 ul li").removeClass("active");
        $(`#select_row_2 ul li[data-title=${text}]`).addClass("active");
        filterBy(state.certi, state.val,state.isDesc).then(rs=>{
            showLists(rs);
        }).catch(err=>console.log(err));

        // location.href = url_page + `?${state.certi}=${state.val}`;
        showNameAndLink(`Trái cây tươi / ` + state.val);
    })
}

// lọc sản phẩm theo xuất xứ
function selectByOrigin(){
    $("#select_1 select").change(function () { 
        state.certi = "from";
        state.val =  $(this).find(":selected").val();
        if(state.val == "Xuất xứ"){
            getAllProducts().then(rs=>{
                showLists(rs);
            }).catch(err=>console.log(err));
        }else{
            filterBy(state.certi,state.val,state.isDesc).then(rs=>{
                showLists(rs);
            }).catch(err=>console.log(err));
        }
    });
}

// Sắp xếp giá thành của sản phẩm
function sortProducts(){
    $("#selection_2 select").change(function () {
        let kq =  $(this).find(":selected").val();
        if(kq == "Giá tăng dần") state.isDesc = false;
        else if(kq == "Giá giảm dần") state.isDesc  = true;
        else state.isDesc = "none";
        state.val = $("#select_row_2 ul").find("li[class=active]").children("a").html();
        if(state.val == "Tất cả"){
            state.certi = "";
            state.val = "";
        }else{
            state.certi = "title";
        }
        filterBy(state.certi,state.val,state.isDesc).then(rs=>{
            if(state.isDesc == true){
                rs = rs.sort(function(a,b) {return b.priece - a.priece});
            }else if (state.isDesc == false){
                rs = rs.sort(function(a,b) {return a.priece - b.priece});
            }else{
                rs = rs;
            }
            showLists(rs);
        })
    });
}

// showNUll
function showNull(){
    let kq = `<div class="col-xs-12 col-md-12 text-left none_find">
                <p>Không tìm thấy sản phẩm phù hợp!</p>
            </div>`;
    $(".row_fruit").html(kq);
    $(".row_fruit_2").html(kq);
}

function setSize(){
    if($("#box_view").attr("data-color") == "false"){
        state.size = 8;
    }
    else state.size = 4;
}

// cập nhật size hiển thị
function updateSize(){
    $("#box_view").click(function (e) { 
        e.preventDefault();
        state.size = 4;
    });
    $("#gird_view").click(function (e) { 
        e.preventDefault();
        state.size = 8;
    });
    // console.log(state.size); 
}

//hiển thị số nút điều khiển có thể dùng phụ thuộc vào số lượng sản phẩm
function showControlButton(rs){
    updateSize();
    let listControl = setControlPageHtml(rs);
    $("#control_page ul").html(listControl);
    showPrevOrNext();
}

function setControlPageHtml(rs){
    let celi = Math.ceil(rs.length/state.size);
    let str =  ``;
    switch(celi){
        case 0: 
            str = ``;
            break;
        case 1:
            str = `<li class="active data-numP" data-numPage="1">1</li>`;
            break;
        case 2:
            str = `<li id="head_list" ><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
                    <li id="prev_1"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
                    <li class="active" data-numPage="1">1</li>
                    <li class="" data-numPage="2">2</li>
                    <li id="next_1"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
                    <li id="foot_list"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>`;
            break;
        case 3: 
            str = `<li id="head_list" ><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
                    <li id="prev_1"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
                    <li class="active" data-numPage="1">1</li>
                    <li class="" data-numPage="2">2</li>
                    <li class="" data-numPage="3">3</li>
                    <li id="next_1"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
                    <li id="foot_list"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>`;
            break;
        default:
            str = `<li id="head_list" ><i class="fa fa-angle-double-left" aria-hidden="true"></i></li>
                    <li id="prev_1"><i class="fa fa-angle-left" aria-hidden="true"></i></li>
                    <li class="active" data-numPage="1">1</li>
                    <li data-numPage="2">2</li>
                    <li >...</li>
                    <li data-numPage="${celi}">${celi}</li>
                    <li id="next_1"><i class="fa fa-angle-right" aria-hidden="true"></i></li>
                    <li id="foot_list"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>`;
            break;
    }
    return str;
}

// kiểm tra xem có khác trang kết quả đầu hay cuối không để hiển thị các nút prev mà next
function showPrevOrNext(){
    // xử lý ẩn hiện nút prev
    let data_page = $("#control_page ul").find("li[class=active]").attr("data-numPage");
    if(data_page == 1){
        $("#prev_1").css("display","none");
    }else{
        $("#prev_1").css("display","content");
    }
    
    
}




