var titles = ["Nho","Táo","Cam","Lê"];
PAGE_ID = 1;
$(function(){
    showAll();
})

function showAll(){
    // hiển thị toàn bộ sản phẩm lên màn hình
    $(".fruits").map(function(){
        let rf = $(this).find(".row_fruit");
        let titleName = $(this).find(".title").html();
        filterBy(titleName).then(function(rs){
            showList(rs,rf);
            clickOneFruits();
            addCartWhenClick_area();
        }); 
    });
}


function showList(rs,obj) {
    let htmlFruits = ``;
    rs.map((item) => {
        htmlFruits += showOneItemType1(item);
    });
    $(obj).html(htmlFruits);
}




