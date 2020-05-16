// 入口函数
$(function () {
    $('.login_form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: $('.login_form').serialize(),
            // 发送请求前，判断用户名或密码是否为空
            beforeSend: function () {
                var $obj = $('.login_form input[name]')
                var flag = false;
                $obj.each(function () {
                    if ($.trim($(this).val()) == '') {
                        flag = true;
                    }
                })
                if (flag) {
                    alert('用户名或密码为空，请重新输入');
                    return false;
                }
            },
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    alert('登录成功');
                    window.location.href = './index.html';
                } else {
                    alert(res.msg);
                }
            }
        })
    })
})