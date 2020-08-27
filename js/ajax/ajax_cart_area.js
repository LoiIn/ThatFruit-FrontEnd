// file ajax cho vùng cart ở mỗi trang web
$(function(){
    loadAllCartItem_area();
})

// 1. In thông tin sản phẩm ra
// lấy tất cả các sản phẩm trong giỏ hàng và in ra màn hình
function getProductFromCart_area(){
    return ajaxGet("cart");
}

function loadAllCartItem_area(){
    getProductFromCart_area().then(function(rs){
        showCartItems_area(rs);
    }).then(function(){
        removeIntemFromCart();
    })
}

function showCartItems_area(rs){
    let htmlTextCart_area = ``;
    let prePrice_area = 0;
    rs.map((item) => {
        htmlTextCart_area += getCartItem_area(item);
        prePrice_area += item.priece*item.quantity;
    });
    $("#list_carts").html(htmlTextCart_area);
    $("#prepare_total").html(
        `<span>Tạm tính: <strong>${numberWithCommas(prePrice_area)} VND</strong></span>`
    )
}

function getCartItem_area(item){
    return `<div class="one_lc">
                <div class="img_box_3">
                    <img src="imgs/fruits/${item.title.toLowerCase()}/${item.name}/1.jpg" alt="">
                </div>
                <div class="name_box">
                    <p>${item.name} - <span>${item.weight}</span></p>
                    <span class = "count+price"><b>${item.quantity}</b> x ${numberWithCommas(item.priece)} VNĐ</span>
                </div>
                <i class="fa fa-trash product_remove_area" aria-hidden="true" data-proId="${item.id}"></i>
            </div>`
}

// 2. Thêm hoặc xóa một sản phẩm khỏi giỏ hàng
// thêm một sản phẩm vào giỏ hàng
function uploadCartItem_area(data){
    return ajaxPost("cart",data);
}

// update số lượng sản phẩm đó
function updateQuantity_area(id,data){
    return ajaxPut(`cart/${id}`,data);
}

// lấy thông tin của một sản phẩm có name = ?
function getInforCartItem_area(id){
    return ajaxGet(`cart?fruitID=${id}`);
}


// nếu chưa có sản phẩm thì add vào giỏ
// nếu có rồi thì chỉ tăng số lượng 
function addCartWhenClick_area(){
    loadAllCartItem_area();
    $(".add_cart").click(function (e) { 
        e.preventDefault();
        let fID = $(this).attr("data-cartItem");
        getInforCartItem_area(fID).then(function(rs){
            let data;
            if(rs.length != 0){
                data = {"quantity" : rs[0].quantity + 1};
                updateQuantity_area(rs[0].id, data);
                viewSuccess("Bạn vừa tăng số lượng " + rs[0].name + " vào trong giỏ hàng");
            }else{
                ajaxGet(`fruits?id=${fID}`).then(function(rsf){
                    rsf = jQuery.grep(rsf,function(a){
                        return a.id === fID;
                    });
                    data =  {
                        "name" : rsf[0].name,
                        "quantity" : PAGE_ID == 2 ? $("#count_of_pr input").val() : parseInt(1),
                        "priece" : rsf[0].priece,
                        "weight" : $(".prWeight.active").html(),
                        "title"  : rsf[0].title,
                        "fruitID" : parseInt(fID)
                    };
                    uploadCartItem_area(data);
                    viewSuccess("Bạn vừa thêm " + rsf[0].name + " vào giỏ hàng thành công");
                });
            }
            loadAllCartItem_area();
            $("html, body").css("overflow", "hidden");
            $("#cart_area2").css("display", "block");
            TweenMax.to($("#cart_area2 #main_"), 1, {right:0,ease: "power4.out"});
        })
        
    });
}

// xử lý nút xóa sản phẩm khỏi giỏ hàng
function removeIntemFromCart(){
    $(".product_remove").click(function (e) { 
        let id = $(this).attr("data-proId");
        deleteCartItem(id);
        viewSuccess("Bạn vừa xóa một sản phẩm khỏi giỏ hàng")
    });
    $(".product_remove_area").click(function (e) { 
        let id = $(this).attr("data-proId");
        deleteCartItem(id);
        viewSuccess("Bạn vừa xóa một sản phẩm khỏi giỏ hàng")
    });
}