// 入口函数
$(function () {
    $('.login_form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: $(this).serialize(),
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
                    // alert('用户名或密码为空，请重新输入');
                    $('.modal').modal('show');
                    $('.modal-body p').text('用户名或密码为空，请重新输入');
                    return false;
                }
            },
            success: function (res) {
                // console.log(res);
                $('.modal').modal('show');
                $('.modal-body p').text(res.msg)
                if (res.code == 200) {
                    // 设置token放在本地存储
                    window.localStorage.setItem('token', res.token);
                    $('.modal').on('hidden.bs.modal', function (e) {
                        window.location.href = './index.html';
                    })
                }
            }
        })
    })
})