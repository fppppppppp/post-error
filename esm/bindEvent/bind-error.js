import { pushErrorInfo } from "../service/handleErrorPost";
import { NetworkRequestError, UnhandledrejectionNotObjectError } from "../error-types";
import { fill } from "../utils/object";
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
    const proto = EventTarget.prototype;
    fill(proto, 'addEventListener', function (original) {
        return function (eventName, fn, options) {
            const addStack = new Error(`Event (${eventName})`).stack;
            fn.__error_wrapped__ = function (...args) {
                try {
                    return fn.apply(this, args);
                }
                catch (err) {
                    err.stack += '\n' + addStack;
                    throw err;
                }
            };
            return original.call(this, eventName, fn.__error_wrapped__ || fn, options);
        };
    });
    fill(proto, 'removeEventListener', function (original) {
        return function (eventName, fn, options) {
            /**
             * There are 2 possible scenarios here:
             *
             * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
             * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
             * as a pass-through, and call original `removeEventListener` with it.
             *
             * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
             * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
             * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
             * in order for us to make a distinction between wrapped/non-wrapped functions possible.
             * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
             *
             * When someone adds a handler prior to initialization, and then do it again, but after,
             * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
             * to get rid of the initial handler and it'd stick there forever.
             */
            try {
                original.call(this, eventName, fn.__error_wrapped__, options);
            }
            catch (e) {
                // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
            }
            return original.call(this, eventName, fn, options);
        };
    });
    // const originAddEventListener = EventTarget.prototype.addEventListener;
    // EventTarget.prototype.addEventListener = (type,listener,options)=>{
    //   const wrappedListener = (...args)=>{
    //     try{
    //       return (listener as any).apply(this,args);
    //     }catch(e){
    //       throw e;
    //     }
    //   }
    //   return originAddEventListener.call(this,type,wrappedListener,options);
    // }
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
    // bindTryCatchEvt();
    bindVueEvt();
}
//# sourceMappingURL=bind-error.js.map