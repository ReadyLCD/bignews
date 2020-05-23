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

    // 热点图
    $.ajax({
        type: 'get',
        url: BigNew.hotPic_news,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('hotlist', res);
                $('.focus_list').html(htmlStr);
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
                $('.commont_news').html(htmlStr);
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