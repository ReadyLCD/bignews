$(function () {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
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
})