layui.use(['jquery','form','layer','table'],function () {
    var $ = layui.jquery
        ,form = layui.form
        ,layer = layui.layer
        ,table = layui.table;

    table.render({
        elem: '#typeList',
        skin: 'line',
        cellMinWidth: 80,
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'ftName', title: '品类名称'
            }, {
                field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
            }]
        ],
        url: "clist.do",
        event: true,
        page: true,
        limit: 5,
        limits: [5, 10, 20, 50]
    });

    form.on('submit(search)',function () {

    });

    window.addFoodType = function (title, url, w, h) {
        debugger;
        if (title == null || title == '') {
            title = false;
        }
        ;
        if (url == null || url == '') {
            url = "404";
        }
        ;
        if (w == null || w == '') {
            w = ($(window).width() * 0.9);
        }
        ;
        if (h == null || h == '') {
            h = ($(window).height() - 50);
        }
        ;
        layer.open({
            type: 2,
            area: [w + 'px', h + 'px'],
            fix: false, //不固定
            maxmin: true,
            shadeClose: true,
            shade: 0.4,
            title: title,
            content: url,
            success: function (layero, index) {
                //向iframe页的id=house的元素传值  // 参考 https://yq.aliyun.com/ziliao/133150
                //debugger;
                var body = layer.getChildFrame('body', index);
            },
            error: function (layero, index) {
                alert("aaa");
            },

        });
    }
});