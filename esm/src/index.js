import { setConfig, getSystem } from "./config/global-config";
import { xhm } from "./service/xhm";
import { setUser, getUserInfo } from "./userinfo/index";
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
const setUserId = function (id) {
    let sys = getSystem();
    const userInfo = getUserInfo();
    if (!userInfo.userid) {
        setUser(id);
    }
    else {
        const _ouu = userInfo.uid;
        this.initUserInfo();
        sys = Object.assign(Object.assign({}, sys), { _ouu });
    }
    xhm(sys, "ch");
};
export { config, setUserId };
//# sourceMappingURL=index.js.map