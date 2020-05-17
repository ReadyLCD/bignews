$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            var htmlStr = template('modal', { list: res.data });
            $('.category_table tbody').html(htmlStr);
        }
    })
})