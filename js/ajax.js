function ajax(options) {
    var _default = {
        url: null,
        type: 'get',
        dataType: 'TXT',
        async: true,
        data: null,
        success: null,
        error: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }
    var xhr = new XMLHttpRequest;
    if (_default.type.toUpperCase() === 'GET') {
        _default.url += _default.url.indexOf('?') === -1 ? '?' : '&';
        _default.url += '_=' + Math.random();
    }
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 4) {
                var text = xhr.responseText;
                _default.dataType = _default.dataType.toUpperCase();
                switch (_default.dataType) {
                    case 'XML':
                        text = xhr.responseText;
                        break;
                    case 'JSON':
                        text = 'JSON' in window ? JSON.parse(text) : eval('(' + text + ')');
                }
            }
            _default.success && _default.success.call(xhr, text);
        }
        if (/^(4|5)\d{2}$/.test(xhr.status)) {
            _default.error && _default.error.call(xhr, xhr.responseText);
        }
    };
    xhr.send(_default.data);
}

