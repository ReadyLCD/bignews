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
            console.log(res);
            if (res.code == 200) {
                $('input.username').val(res.data.username);
                $('input.nickname').val(res.data.nickname);
                $('input.email').val(res.data.email);
                $('.user_pic').attr('src', res.data.userPic);
                $('input.password').val(res.data.password);
            }
        }
    })
})