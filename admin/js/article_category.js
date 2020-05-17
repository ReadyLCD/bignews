$(function () {
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (res) {
                // console.log(res);
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
        $.ajax({
            type: 'post',
            url: BigNew.category_add,
            // data: $('#form').serialize(),
            data: {
                name: $('input[name="name"]').val(),
                slug: $('input[name="slug"]').val()
            },
            success: function (res) {
                console.log(res);
                $('.modal').modal('hide');
                if (res.code == 201) {
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
})