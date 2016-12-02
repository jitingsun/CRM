var indexRender = (function () {
    var ul = document.getElementsByTagName('ul')[0];

    function bindHTML(data) {
        var str = '';
        for (var i = 0, len = data.length; i < len; i++) {
            str += '<li>';
            str += '<span class="w50">' + data[i].id + '</span>';
            str += '<span class="w150">' + data[i].name + '</span>';
            str += '<span class="w50">' + data[i].age + '</span>';
            str += '<span class="w200">' + data[i].phone + '</span>';
            str += '<span class="w200">' + data[i].address + '</span>';
            str += '<span class="w150 control"> ';
            str += '<a href="../detail.html?id=' + data[i].id + '">修改</a>';
            str += '<a href="javascript:;" data-id="' + data[i].id + '">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        ul.innerHTML = str;
    }

    function bindDelete() {
        ul.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase();
            if (tarTag === 'A' && tar.innerHTML == '删除') {
                var customID = tar.getAttribute('data-id');
                var flag = window.confirm('确定要删除id为' + customID + '的信息吗');
                if (flag) {
                    ajax({
                        url: '/removeInfo?id=' + customID,
                        type: 'get',
                        dataType: 'JSON',
                        success: function (result) {
                            console.log(result);
                            if (result && result['code'] == 0) {
                                ul.removeChild(tar.parentNode.parentNode);
                            }
                        }
                    })
                }
            }
        }
    }

    return {
        init: function () {
            ajax({
                url: '/getAllList',
                type: 'get',
                dataType: 'JSON',
                success: function (result) {
                    if (result && result.code === 0) {
                        var data = result.data;
                        bindHTML(data);
                    }
                    bindDelete();
                }
            });
        }
    }
})();
indexRender.init();

