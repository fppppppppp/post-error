import { setConfig, getSystem } from "./config/global-config";
import { xhm } from "./service/xhm";
import { setUser, getUserInfo, initUserInfo } from "./userinfo/index";
import { initEvent } from "./bindEvent/index";
import { initPostError } from "./service/index";
export { bindPlugin, getPlugin, pluginReact } from "./createPlugin";
/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 *
 */
const config = function (option) {
    setConfig(option);
    initEvent();
    initPostError();
};
const setUserId = function (id, info) {
    let sys = getSystem();
    const userInfo = getUserInfo();
    if (!userInfo.userid) {
        setUser(id);
    }
    else {
        const _ouu = userInfo.uid;
        initUserInfo();
        sys = Object.assign(Object.assign({}, sys), { _ouu });
    }
    if (info) {
        sys.info = info;
    }
    xhm(sys, "ch");
};
export { config, setUserId };
//# sourceMappingURL=index.js.map