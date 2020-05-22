$(function () {
    //文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('articlelist', res);
            $('.level_two').html(`<li class="up"></li>` + htmlStr);
            $('.left_menu').html(htmlStr);
        }
    })

    // 热点图
    $.ajax({
        type: 'get',
        url: BigNew.hotPic_news,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('hotlist', res);
            $('.focus_list').html(htmlStr);
        }
    })

    // 最新资讯
    $.ajax({
        type: 'get',
        url: BigNew.latest_news,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('lastNews', res);
            $('.common_news').html(htmlStr);
        }
    })

    // 一周热门资讯
    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('weekhotlist', res);
            $('.hotrank_list').html(htmlStr);
        }
    })

    // 最新评论
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('newcomment', res);
            $('.comment_list').html(htmlStr);
        }
    })

    // 焦点关注
    $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function (res) {
            // console.log(res);
            var htmlStr = template('speciallist', res);
            $('.guanzhu_list').html(htmlStr);
        }
    })
})