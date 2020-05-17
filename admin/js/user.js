// 页面一加载，ajax请求个人详细信息，渲染页面
$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        // dataType: 'json',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
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

    /* // 修改数据提交
    $('#form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求
        // FormData对象对象收集的数据转换成二进制
        var data = new FormData(this);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
            }
        })
    }) */
})