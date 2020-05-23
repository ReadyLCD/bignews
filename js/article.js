$(function () {
    //文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('articlelist', res);
                $('.level_two').html(`<li class="up"></li>` + htmlStr);
                $('.left_menu').html(htmlStr);
            }
        }
    })

    // 一周热门排行
    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('weekhotlist', res);
                $('.hotrank_list').html(htmlStr);
            }
        }
    })

    // 最新评论
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('newcomment', res);
                $('.comment_list').html(htmlStr);
            }
        }
    })

    // 焦点关注
    $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('speciallist', res);
                $('.guanzhu_list').html(htmlStr);
            }
        }
    })

    // 点击搜索按钮跳转到list.html
    // 根据url地址？后面携带的关键词来查询
    $('.search_btn').on('click', function () {
        getIptValue();
    })

    //搜索框按回车键发送搜索内容
    $(document).on('keydown', function (e) {
        // console.log(e.keyCode);  //13
        //$('.search_txt').is(':focus') 判断输入框是否获取焦点
        if (e.keyCode == 13 && $('.search_txt').is(':focus')) {
            getIptValue();
        }
    })

    // 封装了搜索内容的函数
    function getIptValue() {
        // 判断搜索的内容
        var txtValue = $('.search_txt').val();
        if (!txtValue.trim()) {
            alert('搜索的内容不能为空，请输入');
            return;
        }
        // 跳转到列表页把关键词带过去
        $('.search_txt').val('');
        window.location.href = './list.html?txtSearch=' + txtValue;
    }
})

// 搜索文章列表的入口函数
$(function () {
    // 根据index页面中url带过来的？后面的参数
    var str = location.search;
    // console.log(str);

    // 判断是否是正确的操作
    if (!str) {
        window.location.href = './index.html';
        return;
    }
    var obj = utils.converToObj(str);
    // console.log(obj);

    if (obj.id) {
        var data = { type: obj.id };
    } else {
        var data = { key: decodeURI(obj.txtSearch) };
    }
    // 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.artilce_list,
        data: data,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                if (res.data.data.length == 0) {
                    $('.list_title h3').html('暂时没有数据');
                } else {
                    if (obj.id) {
                        $('.list_title h3').html(res.data.data[0].category);
                    } else {
                        $('.list_title h3').html('关键词: ' + decodeURI(obj.txtSearch));
                    }
                    var htmlStr = template('lastNews', res.data);
                    $('.comment_news').html(htmlStr);
                }
            }
        }
    })
})

// 文章详情的入口函数
$(function () {
    //文章详情
    var str = location.search;
    var id = utils.converToObj(str).id;
    // console.log(id);
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('article', res.data);
                $('.setfr .box').html(htmlStr);
                // 文章详情渲染完毕把当前文章ID存储在隐藏域中
                $('.comment_articleId').val(res.data.id);
                // 文章详情渲染完毕才加载当前文章的评论列表
                getCommentList(res.data.id);
            }
        }
    })

    // 发表评论
    $('.comment_form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $('.comment_form').serialize(),
            beforeSend: function () {
                // 判断用户名和评论是否为空
                var author = $('.comment_name').val();
                var content = $('.comment_input').val();
                if (author.trim() == '' && content.trim() == '') {
                    alert('用户名和评论内容不能为空，请输入');
                    return false;
                }
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 201) {
                    alert('评论发表成功');
                    // 发表完评论要重置表单
                    $('.comment_form')[0].reset();
                }
            }
        })
    })

    // 文章的评论列表
    function getCommentList(id) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: id
            },
            success: function (res) {
                // console.log(res);
                var htmlStr = template('commentlist', res);
                $('.comment_list_con').html(htmlStr);
                $('.comment_count').html(res.data.length + '条评论');
            }
        })
    }
}) 