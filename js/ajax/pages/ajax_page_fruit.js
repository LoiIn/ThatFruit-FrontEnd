var fruitAttr = {
    name : "",
    priece : 0,
    from: "",
    weight: "",
    title : "",
    imgs : []
}

$(function(){
    getNameFruits().then(function(rs){
        console.log(rs);
    })
})