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
})