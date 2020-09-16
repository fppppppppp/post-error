import { servicePath } from "../config/config";
import { getUserInfo } from "../userinfo/index";
const gifPostApi = function (option, type = "er") {
    const gif = document.createElement("img");
    const postOption = createUrl(Object.assign(Object.assign({}, option), { _te: type }));
    const path = servicePath + "pr/e.gif" + postOption;
    gif.src = path;
};
function getPostInfo() {
    let userinfo = getUserInfo();
    const { userid, uid, projectInfo, clientType } = userinfo;
    let option = {
        _uu: uid,
        _ct: clientType,
        _p: projectInfo,
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
            value = JSON.stringify(value);
        }
        arr.push(`${i}=${value}`);
    }
    arr.push("_t=" + +new Date());
    return "?" + arr.join("&");
}
export const xhm = gifPostApi;
export const postError = function (option) {
    gifPostApi(option, "er");
};
//# sourceMappingURL=xhm.js.map