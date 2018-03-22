layui.extend({
	admin: '{/}../../static/js/admin'
});

layui.use(['element','layer'],function () {
    var $ = layui.jquery;
    var element = layui.element
        ,layer = layui.layer;
    element.on('tab(tt_tab)', function(elem){

        layer.msg(elem)
        // $.post(
        //     "getTable",
        //     {},
        //     function (result) {
        //
        //     },
        //     "json"
        // );
       // $(elem)
        //console.log(elem)
        //layer.msg(elem.text());
        //elem.tabChange('tt', id)
    });

    function renderContent(ttId) {
        $.post(
            "getTables",
            {"ttId":ttId},
            function (result) {
                alert(result);
            },
            "json"
        );
    }
});





