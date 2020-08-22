
// Chuyển sang trang Trái cây tươi (freshFruit)
$("#move_ff ul li").click(function (e) { 
    let nameTitle = $(this).children("a").html();
    $(this).children("a").attr("href",`freshFruit.html?title=${nameTitle}`);
});

// Chuyển sang trang Liên hệ

