import { setConfig, getSystem } from "./config/global-config";
import { xhm } from "./service/xhm";
import { setUser, getUserInfo, initUserInfo } from "./userinfo/index";
import { initEvent } from "./bindEvent/index";
import { initPostError } from "./service/index";
import { postRouter } from "./bindEvent/bind-route";
import { track as postClick } from "./bindEvent/bind-track";
export { bindPlugin, getPlugin, pluginReact } from "./createPlugin";
/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 *
 */
const config = function (option) {
    setConfig(option);
    xhm(getSystem(), "lo");
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
    // fix: 配置userid  不在上传基本信息
    delete sys.inf;
    xhm(sys, "ch");
};
const handTrack = {
    postRouter,
    postClick
};
export { config, setUserId, handTrack };
//# sourceMappingURL=index.js.map