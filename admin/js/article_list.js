$(function () {
    // 文章列表一打开就获取下拉框的option
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            var htmlStr = template('opt', res);
            $('#selCategory').html(htmlStr);
        }
    })
    var data = {
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 7
    }
    getArticleList(data);
    // 文章一打开就查找默认的文章数据渲染到页面上
    function getArticleList(data) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: data,
            success: function (res) {
                console.log(res);
                var htmlStr = template('articlelist', res.data);
                $('tbody').html(htmlStr);
            }
        })
    }

    // 点击筛选查找对应的文章数据并且渲染到页面上
    $('#btnSearch').on('click', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        getArticleList({
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: 1,
            perpage: 7
        });
    })
})