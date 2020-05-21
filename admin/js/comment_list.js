$(function () {
    //  封装函数
    getPaginationlist(1, pagination);
    function getPaginationlist(myPage, callback) {
        // 页面一加载就发送请求获取评论的数据
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                // console.log(res);
                var htmlStr = template('commentlist', res.data);
                $('tbody').html(htmlStr);

                // 数据一回来就显示分页控件
                // pagination(res);
                if (res.data.totalPage == 0 && myPage == 1) {
                    $('#pagination-demo').hide().next().show();
                } else if (res.data.totalPage != 0 && callback != null) {
                    $('#pagination-demo').show().next().hide();
                    callback(res);
                } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                    // 若当前页的评论都被删除了，要重绘分页控件
                    currentPage -= 1;
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage);
                }
            }
        })
    }
    // 实现分页功能
    var currentPage = 1;
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: visiblePages || 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '最后一页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                // console.log(page);
                currentPage = page;
                getPaginationlist(page, null);
            }
        });
    }

    // 实现删除评论功能
    $('tbody').on('click', '.btn-delete', function () {
        // 发送请求
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    getPaginationlist(currentPage, null);
                }
            }
        })
    })

    // 实现评论审核不通过功能
    $('tbody').on('click', '.btn-reject', function () {
        var _this = this;
        // 发送请求
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    $(_this).parent().prev().html(res.msg);
                } else {
                    $('.modal p').text(res.msg);
                    $('.modal').modal('show');
                }
            }
        })
    })
    // 实现评论审核通过功能
    $('tbody').on('click', '.btn-pass', function () {
        var _this = this;
        // 发送请求
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    $(_this).parent().prev().html(res.msg);
                } else {
                    $('.modal p').text(res.msg);
                    $('.modal').modal('show');
                }
            }
        })
    })
}) 