$(function () {
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: BigNew.user_info,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('.user_info img').attr('src', res.data.userPic);
                $('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                $('.user_center_link img').attr('src', res.data.userPic);
            }
        }
    })
    // 点击退出，返回登录界面
    $('.logout').on('click', function () {
        localStorage.removeItem('token');
        window.location.href = './login.html';
    })

    // 点击左侧导航栏效果
    // 一级列表
    $('.level01').on('click', function () {
        // 当前的一栏添加这个类，其他的移除这个类
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).next().hasClass('level02')) {
            $(this).next().slideToggle();
            // 让小图标旋转
            $(this).find('b').toggleClass('rotate0');
            // 默认选中第一个
            $('.level02>li>a').first()[0].click();
        } else {
            $('.level02>li').removeClass('active');
            $('.level02').slideUp();
        }
    })

    // 二级列表
    $('.level02>li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})