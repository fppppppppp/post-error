import { getUserInfo } from "../userinfo/index";
import { postCloseData } from "../service/xhm";
function getCloseInfo() {
    const systeminfo = getUserInfo();
    const { uid } = systeminfo;
    const blob = new Blob([`_uu=${uid}&_t=${+new Date()}`], { type: 'application/x-www-form-urlencoded' });
    return blob;
}
let isPost = false;
function postData() {
    if (!isPost) {
        let fb = getCloseInfo();
        postCloseData(fb);
        isPost = true;
    }
}
export function bindBeforeunload() {
    window.addEventListener('beforeunload', (event) => {
        postData();
        // Chrome requires returnValue to be set.
    });
    window.addEventListener("unload", (event) => {
        postData();
    });
}
//# sourceMappingURL=bind-close.js.map