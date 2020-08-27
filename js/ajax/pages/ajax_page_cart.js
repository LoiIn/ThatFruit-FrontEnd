PAGE_ID = 0;

$(function(){
    loadAllCartItem();
    showListSameProduct();
})

// lấy tất cả sản phẩm trong giỏ hàng và hiển thị nó lên màn hình
function loadAllCartItem(){
    getAllProuctFromCart().then(function(rs){
        showCartItems(rs);
    }).then(function(){
        plusQuantityItem();
        minusQuantityItem();
        userAddQuantityItem();
        removeIntemFromCart();
    });

}

function showCartItems(rs){
    let htmlTextCart = ``;
    let prePriece = 0;
    rs.map((item) => {
        htmlTextCart += getCartItem(item);
        prePriece += item.quantity * item.priece;
    });
    htmlTextCart += `<tr class="order_total product_money">
                        <th>Tổng</th>
                        <td colspan="5" class="text-right" style="padding-right: 1em;"><strong><span>${numberWithCommas(prePriece)} VNĐ</span></strong></td>
                    </tr>`
    $("#table_cart table tbody").html(htmlTextCart);
}

function getCartItem(item){
    return `<tr data-proId="${item.id}">
                <td class="product_thumbnail" width = "10%">
                    <img src="imgs/fruits/${item.title.toLowerCase()}/${item.name}/1.jpg" alt="">
                </td>
                <td class="product_name" width = "35%">
                    <a href="">${item.name} - ${item.weight} gr</a>
                </td>
                <td class="product_priece product_center">${numberWithCommas(item.priece)} VNĐ</td>
                <td class="product_quantity product_center">
                    <div class="quantity">
                        <input type="button" value="-" class="minus_qtt" size="1" data-proId="${item.id}">
                        <input type="number" value="${item.quantity}" size="4" class="text-center number_qtt" data-proId="${item.id}">
                        <input type="button" value="+" class="plus_qtt" size="1" data-proId="${item.id}">
                    </div>
                </td>
                <td class="product_subtotal product_money product_center">${numberWithCommas(item.quantity*item.priece)} VNĐ</td>
                <td class="product_remove product_center" data-proId="${item.id}"><i class="fa fa-trash" aria-hidden="true"></i></td>
            </tr>`
}

// xử lý phần tăng giảm số lượng sản phẩm
function plusQuantityItem(){
    $(".plus_qtt").click(function (e) { 
        let id = $(this).attr("data-proId"),
            newQuantity = parseInt($(this).prev(".number_qtt").val()) + 1,
            data = {"quantity" : newQuantity};
        updateInforCartItem(id, data);
        $(this).prev(".number_qtt").val(newQuantity);
    
    });
}

function minusQuantityItem(){
    $(".minus_qtt").click(function (e) { 
        let quan = parseInt($(this).next(".number_qtt").val());
        let id = $(this).attr("data-proId"),
            newQuantity = quan == 0 ? 0 : quan - 1,
            data = {"quantity" : newQuantity};
        $(this).next(".number_qtt").val(newQuantity);
        newQuantity == 0 ? deleteCartItem(id) : updateInforCartItem(id, data);
    });
}

function userAddQuantityItem(){
    $(".number_qtt").change(function (e) { 
        let id = $(this).attr("data-proId"),
            newQuantity = $(this).val(),
            data = {"quantity" : newQuantity};
        updateInforCartItem(id, data);
        $(this).val(newQuantity);
    });
}

function showListSameProduct(){
    ajaxGet("fruits?title=Táo").then(function(rs){
        showType1(rs);
        addCartWhenClick_area();
    })
}



