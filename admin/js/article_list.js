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

                // 服务端响应数据回来启动分页功能
                pagination(res.data.totalPage);
            }
        })
    }

    // 点击筛选查找对应的文章数据并且渲染到页面上
    $('#btnSearch').on('click', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        /* getArticleList({
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: 1,
            perpage: 7
        }); */
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 7
            },
            success: function (res) {
                console.log(res);
                var htmlStr = template('articlelist', res.data);
                $('tbody').html(htmlStr);

                // 服务端响应数据回来启动分页功能
                // pagination(res.data.totalPage);
                // 第一个参数是当总页码发生改变的事件，第二个参数是总页数，第三个参数是默认显示的页码值
                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1);
            }
        })
    })

    // 实现分页功能
    function pagination(totalPages, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: totalPages,  //总页数
            visiblePages: visiblePages || 7,  //每页显示的条数
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false,  //插件初始化时在起始页面上点击 false
            onPageClick: function (event, page) {
                // console.log(event, page);
                getArticleList({
                    key: $('#key').val(),
                    type: $('#selCategory').val(),
                    state: $('#selStatus').val(),
                    page: page,
                    perpage: 7
                });
            }
        });
    }
})