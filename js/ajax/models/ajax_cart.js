
// lấy tất cả các sản phẩm trong giỏ hàng
function getAllProuctFromCart(){
    return ajaxGet("cart");
}

// Cập nhật thông tin sản phẩm
function updateInforCartItem(id, data){
    return ajaxPut(`cart/${id}`,data);
}

// xóa bỏ sản phẩm có id ?
function deleteCartItem(id){
    return ajaxDelete(`cart/${id}`);
}