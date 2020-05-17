// 页面一加载，ajax请求个人详细信息，渲染页面
$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        /* headers: {
            'Authorization': localStorage.getItem('token')
        }, */
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('input.username').val(res.data.username);
                $('input.nickname').val(res.data.nickname);
                $('input.email').val(res.data.email);
                $('.user_pic').attr('src', res.data.userPic);
                $('input.password').val(res.data.password);
            }
        }
    })

    // 上传img图片并预览
    $('#exampleInputFile').on('change', function () {
        // console.dir(this);
        // 通过URL.createObjectURL生成一个临时的可访问图片地址
        var file = URL.createObjectURL(this.files[0]);
        $('.user_pic').attr('src', file);
    })

    // 修改数据提交
    $('#form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求
        // FormData对象会将收集的数据转换成二进制
        var data = new FormData(this);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            // 不要使用默认的编码，底层已经是二进制
            contentType: false,
            // 不要转换为字符串，因为底层不设置会转换为字符串
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // 这样的话，index.html页面刷新，会回到index页面，用户体验不好
                    // parent.window.location.reload();
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
                                parent.$('.user_info img').attr('src', res.data.userPic);
                                parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                                parent.$('.user_center_link img').attr('src', res.data.userPic);
                            }
                        }
                    })
                }
            }
        })
    })
})