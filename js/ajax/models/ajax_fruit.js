var mark  = location.href.split("?");

// lấy sản phẩm khi được click
function getFruit(){
    return ajaxGet(`fruits?` + mark[1]);
}