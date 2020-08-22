
// lấy tất cả các sản phẩm trong cửa hàng
function getAllProducts(){
    return ajaxGet("fruits");
}

// lọc sản phẩm theo tiêu chí và giá trị được truyền vào (ví dụ: title = "nho")
function filterBy(certi,val,isDesc){
    return ajaxGet(`fruits?${certi}=${val}`);
}