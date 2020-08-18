var URL_API = "";
var nameF = "";



// get data
async function ajaxGet(url) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + url,
        timeout: 30000,
        success: function (result) {
            rs = result;
        }
    })
    return rs;
}

// upload data
async function ajaxPost(url, data) {
    let rs = null;
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url:  URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    });
    return rs;
}

// update data
async function ajaxPut(url, data) {
    let rs = null;
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url: URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

// delete data
async function ajaxDelete(url, data) {
    let rs = null;
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        url:  URL_API + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxUploadFile(url, file) {
    let rs = null;
    await $.ajax({
        type: "POST",
        url:  URL_API + url,
        data: file,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            rs = result;
        }
    });
    return rs;
}

//view Field
function viewField(data) {
    return data ? data : "";
}

//view error
function viewError(selector, message) {
    

}

// kiểm tra xem một chuỗi có thuộc một chuỗi khác hay không?
function checkHasString(parentString, childrenString){
    var s1 = parentString.toUpperCase(),
        s2 = childrenString.toUpperCase();
    return s1.indexOf(s2);
}

//hidden error
function hiddenError(selector) {
    
}

function getNameF(){
    $(".one_f").click(function (e) { 
        e.preventDefault();
        nameF = $(this).find(".name_f").html();
    })
}

// Hiển thị kết quả
function showLists(rs){
    if(rs.length == 0) showNull();
    else{
        showType1(rs);
        showType2(rs);
    }
}

function showType1(rs){
    let listFruits = ``;
    rs.map((item) => {
        listFruits += showOneItemType1(item);
    });
    $(".row_fruit").html(listFruits);
}

function showType2(rs){
    let listFruits = ``;
    rs.map((item) => {
        listFruits += showOneItemType2(item);
    });
    $(".row_fruit_2").html(listFruits);
}


// show one product type 1 ( grid view)
function showOneItemType1(item){
    return `<div class="one_f">
                <a class="do_du_lieu">
                    <div class="img_box">
                        <img src="imgs/fruits/${item.title.toLowerCase()}/${item.name}/1.jpg" alt="">
                    </div>
                    <div class="text_box text-center">
                        <ul class="rating">
                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                        </ul>
                        <b class="name_f">${item.name}</b>
                        <p class="priece">${item.priece}</p>
                        <ul class="weight">
                            <li><a name="" class="kg_" class="btn btn-primary" href="#" role="button">1kg</a></li>
                            <li><a name="" class="g_" class="btn btn-primary" href="#" role="button">500g</a></li>
                        </ul>
                        <ul class="add_ hidden_media">
                            <li><a href="" class="add_cart"><img src="https://thatfruit.vn/wp-content/themes/wda-child/assets/img/cart-1.png" alt=""> Thêm vào giỏ</a></li>
                            <li><a href="" class="add_wish"><i class="fa fa-heart-o" aria-hidden="true"></i></a> </li>
                        </ul>
                        <a href="" class="show_media add_show"> Thêm vào giỏ</a>                               
                    </div>
                </a>
            </div>`;
}

// show one product type 2 ( list view)
function showOneItemType2(item){
    return ` 
    <a href="fruit.html" class = "do_du_lieu">
        <div class="col-md-12 col-xs-12 one_f_2">
                <div class="img_box_2">
                    <img src="imgs/fruits/${item.title.toLowerCase()}/${item.name}/1.jpg" alt="">
                </div>
                <div class="text_box_2 text-left hidden_media">
                    <ul class="rating">
                        <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                        <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                        <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                        <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                        <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                    </ul>
                    <b class="name_f">${item.name}</b>
                    <p class="details ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ipsum commodi reiciendis enim cupiditate quidem facilis, adipisci esse 
                        harum vel magnam delectus fuga voluptatem labore omnis. Quia porro corporis adipisci ipsa.</p>
                </div>
                <div class="shop_box text-right">
                    <b class="name_f show_media">${item.name}</b>
                    <p class="priece">${item.priece}</p>
                    <ul class="weight">
                        <li><a name="" class="kg_" class="btn btn-primary" href="#" role="button">1kg</a></li>
                        <li><a name="" class="g_" class="btn btn-primary" href="#" role="button">500g</a></li>
                    </ul>
                    <a href="" class="add_cart"><img src="https://thatfruit.vn/wp-content/themes/wda-child/assets/img/cart-1.png" alt=""> Thêm vào giỏ</a>
                    <ul class="see_wish">
                        <li><a href="" class="eye"><i class="fa fa-eye" aria-hidden="true"></i></a></li>
                        <li><a href="" class="wish"><i class="fa fa-heart-o" aria-hidden="true"></i></a> </li>
                    </ul>
                </div>
            </div>
    <a href="fruit.html">`;
}

// thay đổi nội dung của trang
// 1. Chuyển sang nội dung của một quả


