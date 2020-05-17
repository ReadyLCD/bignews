$(function () {
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (res) {
                console.log(res);
                window.info = res.data;
                var htmlStr = template('modal', { list: res.data });
                $('.category_table tbody').html(htmlStr);
            }
        })
    }

    // 新增分类
    $('#xinzengfenlei').on('click', function () {
        $('.modal').modal('show');
        $('.modal-title').text('新增分类');
        $('#form')[0].reset();
    })
    $('.modal .confirm').on('click', function () {
        var id = $('input[name="id"]').val();
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#form').serialize(),
            /* data: {
                name: $('input[name="name"]').val(),
                slug: $('input[name="slug"]').val()
            }, */
            success: function (res) {
                console.log(res);
                $('.modal').modal('hide');
                if (res.code == 201 || res.code == 200) {
                    $('.modal').on('hidden.bs.modal', function (e) {
                        render();
                    })
                }
            },
            error: function () {
                alert('输入内容不能为空或重复，请重新输入');
            }
        })
    })

    // 编辑分类
    $('.category_table').on('click', '.btn-info', function () {
        $('.modal').modal('show');
        $('.modal-title').text('编辑分类');

        var idx = $(this).data('index');
        // console.log(idx);
        // console.log(info);
        var obj = info[idx];
        window.id = obj.id;

        $('input[name="id"]').val(obj.id);
        $('input[name="name"]').val(obj.name);
        $('input[name="slug"]').val(obj.slug);
    })

})