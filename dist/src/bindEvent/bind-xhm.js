import { pushErrorInfo } from "../service/handleErrorPost";
import { XHMHttpResponseError, XHMHttpError } from "../error-types/index";
import { getConfig } from "../config/global-config";
export default function bindXMLEvt() {
    if (!window.XMLHttpRequest)
        return;
    const onXMLResponsePostError = getConfig().onXMLResponsePostError;
    const nativeAjaxSend = XMLHttpRequest.prototype.send; // 首先将原生的方法保存。
    const nativeAjaxOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (mothod, url, ...args) {
        // 劫持open方法，是为了拿到请求的url
        const xhrInstance = this;
        xhrInstance._url = url;
        xhrInstance._mothod = mothod;
        return nativeAjaxOpen.apply(this, [mothod, url].concat(args));
    };
    XMLHttpRequest.prototype.send = function (...args) {
        // 对于ajax请求的监控，主要是在send方法里处理。
        const oldCb = this.onreadystatechange;
        const oldErrorCb = this.onerror;
        const xhrInstance = this;
        xhrInstance._data = args[0];
        xhrInstance.addEventListener("error", function (e) {
            // 这里捕获到的error是一个ProgressEvent。e.target 的值为 XMLHttpRequest的实例。当网络错误(ajax并没有发出去)或者发生跨域的时候，会触发XMLHttpRequest的error, 此时，e.target.status 的值为:0，e.target.statusText 的值为:''
            const errorObj = {
                error_status: {
                    status: e.target.status,
                },
                xml_mothod: xhrInstance._mothod,
                xml_url: xhrInstance._url,
                xml_query: xhrInstance._data,
            };
            if (!xhrInstance._responseError) {
                xhrInstance._responseError = true;
                /*接下来可以对errorObj进行统一处理*/
                pushErrorInfo(new XHMHttpError(JSON.stringify(errorObj)), "", {
                    line: 0,
                    col: 0,
                    other: JSON.stringify({ responseData: e.target.responseText.slice(0, 2000) }),
                });
            }
        });
        xhrInstance.addEventListener("abort", function (e) {
            // 主动取消ajax的情况需要标注，否则可能会产生误报
            if (e.type === "abort") {
                xhrInstance._isAbort = true;
            }
        });
        this.onreadystatechange = function (...innerArgs) {
            if (xhrInstance.readyState === 4) {
                if (!xhrInstance._isAbort && xhrInstance.status !== 200) {
                    // 请求不成功时，拿到错误信息
                    const errorObj = {
                        error_msg: JSON.stringify({
                            status: xhrInstance.status,
                        }),
                        xml_url: xhrInstance._url,
                        xml_mothod: xhrInstance._mothod,
                        xml_query: xhrInstance._data,
                    };
                    if (!xhrInstance._responseError) {
                        xhrInstance._responseError = true;
                        /*接下来可以对errorObj进行统一处理*/
                        pushErrorInfo(new XHMHttpResponseError(JSON.stringify(errorObj)), "", {
                            line: 0,
                            col: 0,
                            other: JSON.stringify({
                                responseData: xhrInstance.responseText.slice(0, 2000),
                            }),
                        });
                    }
                }
                else if (xhrInstance.status === 200 &&
                    onXMLResponsePostError &&
                    onXMLResponsePostError(xhrInstance.responseText)) {
                    const errorObj = {
                        error_msg: JSON.stringify({
                            code: xhrInstance.status,
                        }),
                        xml_mothod: xhrInstance._mothod,
                        xml_url: xhrInstance._url,
                        xml_query: xhrInstance._data,
                    };
                    if (!xhrInstance._responseError) {
                        xhrInstance._responseError = true;
                        /*接下来可以对errorObj进行统一处理*/
                        pushErrorInfo(new XHMHttpResponseError(JSON.stringify(errorObj)), "", {
                            line: 0,
                            col: 0,
                            other: JSON.stringify({
                                responseData: xhrInstance.responseText.slice(0, 2000),
                            }),
                        });
                    }
                }
            }
            oldCb && oldCb.apply(this, innerArgs);
        };
        return nativeAjaxSend.apply(this, args);
    };
}
//# sourceMappingURL=bind-xhm.js.map