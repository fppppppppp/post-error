export function ajax(options) {
    options = options || {}; //调用函数时如果options没有指定，就给它赋值{},一个空的Object
    options.type = (options.type || "GET").toUpperCase(); /// 请求格式GET、POST，默认为GET
    options.dataType = options.dataType || "json"; //响应数据格式，默认json
    var params = formatParams(options.data); //options.data请求的数据
    var xhr = new XMLHttpRequest();
    //启动并发送一个请求
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    }
    else if (options.type == "POST") {
        xhr.open("post", options.url, true);
        //设置表单提交时的内容类型
        //Content-type数据请求的格式
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    var timer = null;
    //    设置有效时间
    options.timeout && (timer = setTimeout(function () {
        if (xhr.readyState != 4) {
            xhr.abort();
        }
    }, options.timeout));
    //    接收
    //     options.success成功之后的回调函数  options.error失败后的回调函数
    //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            options.timeout && clearTimeout(timer);
            var status = xhr.status;
            if (status >= 200 && status < 300 || status == 304) {
                options.success && options.success(xhr.responseText, xhr);
            }
            else {
                options.error && options.error(status, xhr);
            }
        }
    };
}
//格式化请求参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}
//# sourceMappingURL=ajax.js.map