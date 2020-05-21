$(function () {
    var str = window.location.search;
    var id = utils.converToObj(str).id;
    // console.log(id);
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

    // 当页面一加载就获取文章的信息
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('#inputId').val(res.data.id);
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                // $('.category').val(res.data.categoryId);
                $('input[name=date]').val(res.data.date);
                // $('textarea[name=content]').val(res.data.content);
                editor.txt.html(res.data.content);
                var categoryId = res.data.categoryId;
                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    success: function (res) {
                        // console.log(res);
                        res.categoryId = categoryId;
                        if (res.code == 200) {
                            var htmlStr = template('opt', res);
                            $('.category').html(htmlStr);
                        }
                    }
                })
            }
        }
    })

    // 上传图片处理
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
        if ($(e.target).hasClass('btn-edit')) {
            data.append('state', '已发布');
        } else {
            data.append('state', '草稿');
        }
        data.append('content', editor.txt.html());
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: data,
            // 不要进行其他的编码，因为底层编码已经是二进制
            contentType: false,
            // 不要转换为字符串
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // 退回到上一个页面
                    window.history.back();
                }
            }
        })
    })

})