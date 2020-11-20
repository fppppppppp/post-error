import { postError } from "./xhm";
import { setCacheToMax } from "./cacheInfo";
import { getConfig } from "../config/global-config";
import { listen, trigger } from "../utils/obersve";
import { getStackLineCol } from "../utils/error-stack";
// 定时器 定时发送数据
let timer = null;
// 定义一个数组存放错误数据;
const errorList = [];
function needMax() {
    const config = getConfig();
    const { repeat } = config;
    return typeof repeat === "number" && repeat > 0 ? repeat : -1;
}
export function pushErrorInfo(e, str = "", option = {}) {
    const errStr = e + str;
    const { name, message, stack } = e;
    const errorType = e._errorName || e.name || "unkonw";
    let { line, col, other } = option;
    if (!line || !col) {
        const linecol = getStackLineCol(stack);
        if (linecol) {
            line = linecol.line * 1;
            col = linecol.col * 1;
        }
    }
    let value = {
        name,
        // message,
        stack,
        errStr,
        errorType,
        time: +new Date(),
        line,
        col,
        other
    };
    const pushInfo = setCacheToMax(errStr, value, needMax());
    if (pushInfo) {
        if (pushInfo.length > 1) {
            let index = errorList.findIndex(item => item.data.errStr === errStr);
            if (index > -1) {
                errorList[index] = pushInfo;
            }
            else {
                pushInfo && errorList.push(pushInfo);
            }
        }
        else {
            pushInfo && errorList.push(pushInfo);
        }
        trigger("onErrorPush");
    }
}
function doPost() {
    if (!errorList.length)
        return;
    const arr = errorList.slice(0);
    errorList.length = 0;
    postError({
        list: arr,
    });
}
function loopPostData() {
    const config = getConfig();
    const { delay, mergeReport } = config;
    listen("onErrorPush", () => {
        if (mergeReport && delay && delay > 0) {
            if (!timer) {
                timer = setInterval(() => {
                    doPost();
                }, delay);
            }
        }
        else {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            doPost();
        }
    });
}
export function initErrorPost() {
    loopPostData();
}
//# sourceMappingURL=handleErrorPost.js.map