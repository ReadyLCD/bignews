$(function () {
    $('.input_sub').on('click', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 判断用户名和密码是否为空
        var username = $('.input_txt').val();
        var password = $('.input_pass').val();
        if ($.trim(username) == '' || $.trim(password) == '') {
            alert('用户名或密码不能为空，请重新输入');
            return;
        }
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    alert(res.msg);
                    window.location.href = './index.html';
                } else {
                    alert(res.msg);
                }
            }
        })
    })
})