import { pushErrorInfo } from "../service/handleErrorPost";
import { NetworkRequestError, UnhandledrejectionNotObjectError } from "../error-types";
function bindError() {
    window.onerror = function (msg, url, lineNo, columnNo, e) {
        if (msg === "Script error." || !url) {
            return;
        }
        pushErrorInfo(e);
    };
}
function bindUnhandelrejectionEvt() {
    window.addEventListener("unhandledrejection", (e) => {
        if (typeof e.reason === "object") {
            pushErrorInfo(e.reason, "未处理的 unhandledrejection 事件 --- ");
        }
        else {
            let message = typeof e.reason === "string" ? e.reason : JSON.stringify(e.reason);
            const error = new UnhandledrejectionNotObjectError(message, "unhandledrejection");
            pushErrorInfo(error);
        }
    });
}
function bindErrorEvt() {
    window.addEventListener('error', event => {
        let error = null;
        if (event.target instanceof HTMLScriptElement) {
            error = new NetworkRequestError(event.target.src, "LoadScriptError");
        }
        if (event.target instanceof HTMLLinkElement) {
            error = new NetworkRequestError(event.target.href, "LoadLinkError");
        }
        if (event.target instanceof HTMLImageElement) {
            error = new NetworkRequestError(event.target.src, "LoadLinktError");
        }
        error && pushErrorInfo(error);
    }, true);
}
function bindTryCatchEvt() {
    const originAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = (type, listener, options) => {
        const wrappedListener = (...args) => {
            try {
                return listener.apply(this, args);
            }
            catch (e) {
                throw e;
            }
        };
        return originAddEventListener.call(this, type, wrappedListener, options);
    };
}
function bindVueEvt() {
    if (!window.Vue || !window.Vue.config) {
        return;
    }
    let _oldOnError = window.Vue.config.errorHandler;
    window.Vue.config.errorHandler = function (errMsg, vm, info) {
        pushErrorInfo(errMsg);
        if (typeof _oldOnError === "function") {
            _oldOnError.call(this, errMsg, vm, info);
        }
    };
}
export function initBindEvent() {
    bindError();
    bindUnhandelrejectionEvt();
    bindErrorEvt();
    bindTryCatchEvt();
    bindVueEvt();
}
//# sourceMappingURL=bindError.js.map