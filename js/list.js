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

    // 一周热门资讯
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

    // 最新资讯
    $.ajax({
        type: 'get',
        url: BigNew.latest_news,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('lastNews', res);
                $('.comment_news').html(htmlStr);
            }
        }
    })
})

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
            console.log(res);
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