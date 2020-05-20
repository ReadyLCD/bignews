$(function () {
    var str = window.location.search;
    var id = utils.converToObj(str).id;
    // console.log(id);
    // 当页面一加载就获取文章的信息
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                $('.category').val(res.data.categoryTd);
                $('input[name=date]').val(res.data.date);
                $('textarea[name=content]').val(res.data.content);
            }
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('opt', res);
                $('.category').html(htmlStr);
            }
        }
    })

})