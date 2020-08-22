
// Lấy phần tử theo loại
function  filterBy(titleName) {
    return ajaxGet(`fruits?title=${titleName}`);
}