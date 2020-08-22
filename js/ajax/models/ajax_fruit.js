var mark = "file:///D:/Git-folder/ThatFruit-FrontEnd/fruit.html".length;

// lấy sản phẩm khi được click
function getFruit(){
    return ajaxGet(`fruits` + location.href.slice(mark));
}