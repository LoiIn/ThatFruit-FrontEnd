URL_API = "https://5f23e43c3b9d350016203b87.mockapi.io/api/v1/fruits";

// lấy tất cả các sản phẩm trong cửa hàng
function getAllProducts(){
    return ajaxGet("");
}

// lọc sản phẩm theo tiêu chí và giá trị được truyền vào (ví dụ: title = "nho")
function filterBy(certi,val,isDesc){
    return ajaxGet(`?${certi}=${val}`);
}