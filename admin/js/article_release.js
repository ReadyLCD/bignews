$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var htmlStr = template('opt', res);
                $('.category').html(htmlStr);
            }
        }
    })
    // 使用jedate插件封装的方法
    jeDate("#indate", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 20999,
        minDate: "2014-09-19 00:00:00"
    })
    // 使用富文本wangEditor插件的方法
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    // 图片预览处理
    $('#inputCover').on('change', function (e) {
        // console.dir(this);
        // URL.createObjectURL可以临时生成一个可访问的图片地址
        var file = URL.createObjectURL(this.files[0]);
        $('.article_cover').attr('src', file);
    })

    // 给修改按钮注册事件
    $('#form').on('click', '.btn', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // console.log(e.target);
        var form = $('#form')[0];
        var data = new FormData(form);
        if ($(e.target).hasClass('btn-release')) {
            data.append('state', '已发布');
        } else {
            data.append('state', '草稿');
        }
        data.append('content', editor.txt.html());
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            // 不要进行其他的编码，因为底层编码已经是二进制
            contentType: false,
            // 不要转换为字符串
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // 发表完文章回到文章列表
                    parent.$('.level02>li:eq(0)').click();
                    window.location.href = './article_list.html';
                }
            }
        })
    })
})