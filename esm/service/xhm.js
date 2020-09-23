import { servicePath } from "../config/config";
import { getUserInfo } from "../userinfo/index";
import { listen } from "../utils/obersve";
import { version } from '../../package.json';
let serviceUrl = servicePath;
listen("changeUrl", (path) => {
    serviceUrl = path;
});
const gifPostApi = function (option, type = "er") {
    const gif = document.createElement("img");
    const postOption = createUrl(Object.assign(Object.assign({}, option), { _te: type }));
    const path = serviceUrl + "pr/e.gif" + postOption;
    gif.src = path;
};
function getPostInfo() {
    let userinfo = getUserInfo();
    const { userid, uid, projectInfo, clientType } = userinfo;
    const { href } = window.location;
    let option = {
        _uu: uid,
        _ct: clientType,
        _p: projectInfo,
        _fm: href,
        _v: version
    };
    if (userid) {
        option._uid = userid;
    }
    return option;
}
function createUrl(info) {
    let arr = [];
    const deInfo = getPostInfo();
    const op = Object.assign(Object.assign({}, info), deInfo);
    for (let i in op) {
        let value = op[i];
        if (typeof value === "object") {
            value = encodeURIComponent(JSON.stringify(value));
        }
        arr.push(`${i}=${encodeURIComponent(value)}`);
    }
    arr.push("_t=" + +new Date());
    return "?" + arr.join("&");
}
export const postCloseData = function (fb) {
    let url = serviceUrl + "cl";
    navigator.sendBeacon(url, fb);
};
export const xhm = gifPostApi;
export const postError = function (option) {
    gifPostApi(option, "er");
};
//# sourceMappingURL=xhm.js.map