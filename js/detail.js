(function (pro) {
    function queryUrlParameter() {
        var reg = /([^?&#=]+)=([^?&#=]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryUrlParameter = queryUrlParameter;
})(String.prototype);
var detailRender = (function () {
    var submit = document.getElementById('submit');
    var username = document.getElementById('userName');
    var age = document.getElementById('age');
    var userTel = document.getElementById('userTel');
    var userAddress = document.getElementById('userAddress');
    var customId = null,
        isUpdate = false;

    function bindEvent() {
        submit.onclick = function () {
            if (isUpdate) {
                var data1 = {
                    id: customId,
                    name: username.value,
                    age: age.value,
                    phone: userTel.value,
                    address: userAddress.value
                };
                ajax({
                    url: '/updateInfo',
                    type: 'POST',
                    dataType: 'JSON',
                    data: JSON.stringify(data1),
                    success: function (res) {
                        if (res && res.code === 0) {
                            window.location.href = 'index.html';
                        }
                    }
                });
                return;
            }
            var data = {
                name: username.value,
                age: age.value,
                phone: userTel.value,
                address: userAddress.value
            };
            ajax({
                url: '/addInfo',
                type: 'POST',
                dataType: 'JSON',
                data: JSON.stringify(data),
                success: function (res) {
                    console.log(res);
                    if (res && res.code === 0) {
                        window.location.href = 'index.html';
                    }
                }
            })

        }
    }

    return {
        init: function () {
            var obj = window.location.href.queryUrlParameter();
            if (typeof obj['id'] !== 'undefined') {
                isUpdate = true;
                customId = obj['id'];
                ajax({
                    url: '/getInfo?id=' + customId,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (res) {
                        console.log(res);
                        if (res && res.code == 0) {
                            res = res.data;
                            username.value = res.name;
                            age.value = res.age;
                            userTel.value = res.phone;
                            userAddress.value = res.address;
                        }
                    }
                });
            }
            bindEvent();
        }
    }
})();
detailRender.init();
