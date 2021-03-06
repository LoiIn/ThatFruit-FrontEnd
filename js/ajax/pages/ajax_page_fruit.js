PAGE_ID = 2;

var link = "imgs/fruits"

$(function(){
    showAllInfor();
})

function showAllInfor(){
    getFruit().then(function(rs){
        // hiển thị đường link sản phẩm
        showNameAndLink(rs[0].name);

        // hiển thị thông tin của sản phẩm
        $("#product_infor").html(setHtml(rs[0]));

        // hiển thị phần ảnh
        $("#slide_area").html(setImgHtml(rs[0]));
        slideAnh(rs[0]);
        
        //thêm sản phẩm vào giỏ đồ tạm
        addCartWhenClick_area();
        
        // thay đổi trọng lượng của sản phẩm và số tiền tương ứng
        changeProductWeight();
    }).catch(err=>console.log(err));
    
}

function setHtml(item){
    return `<b class="name_f">${item.name}</b>
            <p class="priece">${numberWithCommas(item.priece)}Đ</p>
            <ul class="rating">
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                <li id="count_rating" style="color: #777;">(0 Đánh giá)</li>
            </ul>
            <p id="pr_from" class="pr_from_state">Xuất xứ: <b>${item.from}</b></p>
            <p id="pr_state" class="pr_from_state">Tình trạng: <b>${item.status == true ? "còn hàng" : "hết hàng"}</b> </p>
            <p id="less_review">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo
                impedit quae, dicta quas minus voluptate eum provident ex quam 
                facilis, ducimus fuga voluptates maxime dolor reprehenderit odio? 
                Cupiditate, qui!
            </p>
            <ul class="weight" data-corresping-priece = "${item.priece}">
                <li style="margin-left:0; color: black; font-weight: 800;">TRỌNG LƯỢNG</li>
                <li class="kg_"><a name="" class="btn btn-primary prWeight" href="#" role="button">1kg</a></li>
                <li class="g_"><a name="" class="btn btn-primary prWeight active" href="#" role="button">500g</a></li>
            </ul>
            <ul class="add_ ">
                <li id="count_of_pr">
                    <input type="number" value ="1" size = 4>
                </li>
                <li><a class="add_cart" data-cartItem="${item.id}" data-cartPriece = "${item.priece}"><img src="https://thatfruit.vn/wp-content/themes/wda-child/assets/img/cart-1.png" alt=""> Thêm vào giỏ</a></li>
                <li><a href="" class="add_wish"><i class="fa fa-heart-o" aria-hidden="true"></i></a> </li>
            </ul>
            <p id="direct_link">Danh mục: <b>${item.title}, Trái cây tươi</b></p>`
}

function setImgHtml(item){
    let stringImg = `imgs/fruits/${item.title.toLowerCase()}/${item.name}`;
    return `<div class="row">
                <div class="col-xs-12 col-md-9 col-sm-9 ">
                    <div class="slider-for">
                        <img id="zoom_img" src="${stringImg}/1.jpg" alt="" data-zoom-image="imgs/home/f1.jpg"/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-3 col-sm-3" id = "right_slide">
                    <div class="slider-nav">
                        <div class="one_slider" data-img="1">
                            <div class="white_cover" data-white = "1"></div>
                            <img src="${stringImg}/1.jpg" alt="">
                        </div>
                        <div class="one_slider" data-img="2">
                            <div class="white_cover" data-white="2"></div>
                            <img src="${stringImg}/2.jpg" alt="">
                        </div>
                        <div class="one_slider" data-img="3">
                            <div class="white_cover" data-white="3"></div>
                            <img src="${stringImg}/3.jpg" alt="">
                        </div>
                        <div class="one_slider" data-img="4">
                            <div class="white_cover" data-white="4"></div>
                            <img src="${stringImg}/4.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>`
}

function slideAnh(item){
    $('.one_slider').click(function (e) {
        $(".white_cover").css('opacity','1');
        e.preventDefault();
        let data_img = $(this).attr('data-img');
        let link = `imgs/fruits/${item.title.toLowerCase()}/${item.name}/${data_img}.jpg`;
        $(this).find(".white_cover").css('opacity','0');
        $('.slider-for img').attr('src',link);
    });
}




