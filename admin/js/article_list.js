$(function () {
    // 文章列表一打开就获取下拉框的option
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('opt', res);
            $('#selCategory').html(htmlStr);
        }
    })
    getArticleDataList(1, pagination);
    // 把相同的代码封装在函数中
    function getArticleDataList(myPage, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                // console.log(res);
                var htmlStr = template('articlelist', res.data);
                $('tbody').html(htmlStr);

                // 服务端响应数据回来启动分页功能
                if (res.data.totalPage == 0 && myPage == 1) {
                    $('#pagination-demo').hide().next().show();
                } else if (res.data.totalPage != 0 && callback != null) {
                    $('#pagination-demo').show().next().hide();
                    callback(res);
                } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                    // 当前页的数据被删除完，要页码要减1，主要针对最后一页
                    currentPage -= 1;
                    // 重绘控件页码
                    // 更新分页控件的总页码 
                    // 1. 第1个参数是一个事件 当页码值发生变化时就会触发
                    // 2. 第2个参数是 要变化的新的总页码值
                    // 3. 第3个参数 是当前页码值
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage);
                }
            }
        })
    }

    // 点击筛选查找对应的文章数据并且渲染到页面上
    $('#btnSearch').on('click', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 重绘控件页码
        getArticleDataList(1, function (res) {
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1);
        })
    })

    // 实现分页功能
    var currentPage = 1;
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,  //总页数
            visiblePages: visiblePages || 7,  //每页显示的条数
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false,  //插件初始化时在起始页面上点击 false
            onPageClick: function (event, page) {
                currentPage = page;
                getArticleDataList(page, null);
            }
        });
    }

    // 删除文章列表中文章
    var articleId;
    $('#delModal').on('show.bs.modal', function (e) {
        console.log(e.relatedTarget);
        articleId = $(e.relatedTarget).data('id');
    })
    $('.delModal .btn-sure').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: articleId
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 204) {
                    $('.modal').modal('hide');
                    getArticleDataList(currentPage, null);
                }
            }
        })
    })
})